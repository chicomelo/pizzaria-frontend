import { api } from "@/services/api";
import { handleRegisterProduct } from "./actions";
import { FormProduct } from "./FormProduct";
import { getCookieServer } from "@/lib/cookieServer";

export default async function Product() {
  const token = await getCookieServer();

  const response = await api.get("/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const categories = response.data;

  return <FormProduct categories={categories} action={handleRegisterProduct} />;
}
