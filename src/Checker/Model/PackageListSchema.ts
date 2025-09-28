import { z } from "zod";

export const PackageListSchema = z.array(
  z.object({
    name: z.string().nonempty(),
    versions: z.array(z.string().nonempty()).min(1),
  })
);
export default PackageListSchema;