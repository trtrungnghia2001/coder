import axios from "axios";

export async function getProductByID(id: any) {
  try {
    const url = `https://tiki.vn/api/v2/products/${id}?platform=web&spid=274038337&version=3`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function getProductByCategory(params: any) {
  try {
    const text = `limit=40&include=advertisement&aggregations=2&version=home-persionalized`;
    const url = `https://tiki.vn/api/personalish/v1/blocks/listings?${text}`;
    const res = await (await axios.get(url, { params: params })).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
