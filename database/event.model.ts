import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for the Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be online, offline, or hybrid",
      },
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "At least one tag is required",
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to generate slug from title, normalize date to ISO format,
 * and ensure time is in consistent format (HH:MM)
 */
EventSchema.pre("save", function (next) {
  // Generate slug only if title is modified or document is new
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  }

  // Normalize date to ISO format (YYYY-MM-DD) if modified
  if (this.isModified("date")) {
    try {
      const parsedDate = new Date(this.date);
      if (isNaN(parsedDate.getTime())) {
        return next(new Error("Invalid date format"));
      }
      this.date = parsedDate.toISOString().split("T")[0];
    } catch (error) {
      return next(new Error("Invalid date format"));
    }
  }

  // Normalize time to HH:MM format if modified
  if (this.isModified("time")) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(this.time)) {
      return next(new Error("Time must be in HH:MM format (e.g., 14:30)"));
    }
    // Ensure two-digit format
    const [hours, minutes] = this.time.split(":");
    this.time = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  }

  next();
});

// Prevent model recompilation in development (Next.js hot reload)
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
