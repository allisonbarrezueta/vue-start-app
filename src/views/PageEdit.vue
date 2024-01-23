<template>
  <h4>Edit {{ page.title }}</h4>
  <form action="" class="container mb-3">
    <div class="row">
      <div class="col-md-8">
        <div class="mb-3">
          <label for="title" class="form-label">Page Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Title"
            v-model="page.title"
          />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Content</label>
          <textarea
            class="form-control"
            id="content"
            rows="5"
            v-model="page.content"
          ></textarea>
        </div>
      </div>
      <div class="col">
        <div class="mb-3">
          <label for="link-text" class="form-label">Link Text</label>
          <input
            type="text"
            class="form-control"
            id="link-text"
            placeholder="Link Text"
            v-model="page.link.text"
          />
        </div>
        <div class="mb-3">
          <label for="link-url" class="form-label">Link URL</label>
          <input
            type="text"
            class="form-control"
            id="link-url"
            placeholder="Link URL"
            v-model="page.link.url"
          />
        </div>
        <div class="mb-3">
          <label for="published" class="form-label">Published</label>
          <input
            type="checkbox"
            class="form-check-input"
            v-model="page.published"
            id="published"
          />
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-primary me-2" @click.prevent="submit">Edit</button>
      <button class="btn btn-secondary" @click.prevent="goToPagesList()">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { toRefs, inject } from "vue";

const route = useRouter();
const pages = inject("$pages");
const bus = inject("$bus");
const props = defineProps(["index"]);

let page = pages.getSinglePage(props.index);

function submit() {
  pages.editPage(props.index, page);
  bus.$emit("page-update", {
    index: props.index,
    page,
  });
  goToPagesList();
}
function goToPagesList() {
  route.push({ path: "/pages" });
}
</script>
