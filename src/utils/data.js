const pagesKey = "pages";

let pageJson = localStorage.getItem(pagesKey);
let pagesStore = pageJson ? JSON.parse(pageJson) : [];

export default {
  getAllPages() {
    return pagesStore;
  },
  getSinglePage(index) {
    return pagesStore[index];
  },
  editPage(index, page) {
    pagesStore[index] = page;
    this.savePages();
  },
  addPage(page) {
    pagesStore.push(page);
    this.savePages();
  },
  removePage(index) {
    pagesStore.splice(index, 1);
    this.savePages();
  },
  savePages() {
    localStorage.setItem(pagesKey, JSON.stringify(pagesStore));
  },
};
