import app from "./app";
import { env } from "./config/env";
import { API_PREFIX } from "./config/constants";

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
  console.log(`API is available at http://localhost:${env.PORT}${API_PREFIX}`);
});
