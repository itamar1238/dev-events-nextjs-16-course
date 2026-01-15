import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for the Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to verify that the referenced event exists
 * Throws an error if the event is not found in the database
 */
BookingSchema.pre("save", async function (next) {
  // Only validate eventId if it's modified or document is new
  if (this.isModified("eventId")) {
    try {
      // Dynamically import Event model to avoid circular dependency
      const Event =
        mongoose.models.Event || (await import("./event.model")).default;

      const eventExists = await Event.exists({ _id: this.eventId });

      if (!eventExists) {
        return next(new Error(`Event with ID ${this.eventId} does not exist`));
      }
    } catch (error) {
      return next(
        new Error(
          `Error validating event reference: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        )
      );
    }
  }

  next();
});

// Prevent model recompilation in development (Next.js hot reload)
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
