const extendOrigin = process.env.EXTEND_CORS
  ? process.env.EXTEND_CORS.split(';')
  : [];
export const corsConfig = {
  origin: ['http://localhost:3000', ...extendOrigin],
  credentials: true,
};
