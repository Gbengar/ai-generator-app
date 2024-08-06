/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://genprop_owner:Jdw9CrlOREq5@ep-tight-band-a2vohw93.eu-central-1.aws.neon.tech/AI-Content-Generator?sslmode=require",
  },
};
