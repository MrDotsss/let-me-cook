import { ObjectId } from "mongodb";
import z from "zod";

export const objectIdSchema = z
  .string()
  .refine((value) => ObjectId.isValid(value), {
    error: "Invalid object ID",
  });
