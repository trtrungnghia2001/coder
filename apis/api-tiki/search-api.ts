import axios from "axios";

export async function getSearchProduct(searchParams: any) {
  try {
    const url = `https://tiki.vn/api/v2/search/suggestion?${searchParams}`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function getSearchResultProduct(searchParams: any) {
  try {
    const url = `https://tiki.vn/api/v2/products?${searchParams}`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
