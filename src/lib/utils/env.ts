import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string(),
  IMAGE_URL: z.string(),
  API_KEY: z.string(),
  ACCESS_TOKEN: z.string(),
  DISCOVER_MOVIE_ENDPOINT: z.string(),
  POPULAR_MOVIE_ENDPOINT: z.string(),
  TOP_RATED_MOVIE_ENDPOINT: z.string(),
  UPCOMING_MOVIE_ENDPOINT: z.string(),
  SEARCH_MOVIE_ENDPOINT: z.string(),
  MOVIE_ENDPOINT: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),
  HASH_SALT: z.string(),
});

export type envType = z.infer<typeof envSchema>;

const isValidEnv = envSchema.safeParse(process.env);

if (!isValidEnv.success) {
  throw new Error('Invalid ENV');
}

const validEnv = isValidEnv.data;

export default validEnv;
