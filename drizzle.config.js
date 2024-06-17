/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai-interview-mocker_owner:rkM3O4tTnCaB@ep-lively-dream-a1xscudz.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require",
  },
};
