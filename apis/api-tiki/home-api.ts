import axios from "axios";

export async function getMenuconfig() {
  try {
    const url = `https://api.tiki.vn/raiden/v2/menu-config`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
interface IBanners_group {
  typeBanner:
    | "msp_home_2_7_banner_carousel"
    | "msp_widget_banner_premium"
    | "commercial_banner_on_home";
}
export async function getBanners_group(props: IBanners_group) {
  try {
    const url = `https://tka.tiki.vn/widget/api/v1/banners-group?group=${props.typeBanner}`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function getQuickLink() {
  try {
    const url = `https://api.tiki.vn/raiden/v3/widgets/quick_link`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function getMaybe_you_like() {
  try {
    const url = `https://api.tiki.vn/raiden/v3/widgets/maybe_you_like`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function getSuggestion_today() {
  try {
    const url = `https://tiki.vn/api/personalish/v1/blocks/collections?block_code=infinite_scroll&page_size=36&version=home-persionalized`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function getFaqs() {
  try {
    const url = `https://api.tiki.vn/falcon/ext/v1/question/faqs`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function getImported_genuine() {
  try {
    const url = `https://api.tiki.vn/raiden/v3/widgets/imported_genuine`;
    const res = await (await axios.get(url)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
}
