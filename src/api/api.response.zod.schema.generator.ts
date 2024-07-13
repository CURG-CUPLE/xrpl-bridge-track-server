import { z, ZodTypeAny } from 'zod';

export const DefaultErrorSchemaZ = z.object({
  code: z.string(),
  message: z.string(),
  detail: z.any().optional(),
});
export type DefaultErrorSchemaT = z.infer<typeof DefaultErrorSchemaZ>;

export function createApiResponseSchema<
  T extends ZodTypeAny,
  E extends ZodTypeAny /*= typeof DefaultErrorSchemaZ | null*/,
>(dataSchema: T, errorSchema: E) {
  return z.object({
    path: z.string(),
    data: dataSchema,
    error: errorSchema,
    responseTime: z.string(),
  });
}

export const ApiResponseSchemaZ = createApiResponseSchema(z.any(), z.null());
export type ApiResponseT = z.infer<typeof ApiResponseSchemaZ>;
export const ApiErrorResponseSchemaZ = createApiResponseSchema(z.null(), DefaultErrorSchemaZ);
export type ApiErrorResponseSchemaT = z.infer<typeof ApiErrorResponseSchemaZ>;
