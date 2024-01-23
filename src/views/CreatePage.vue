<script setup>
import { ref, inject, computed, watch } from "vue";
import { useRouter } from "vue-router";

const bus = inject("$bus");
const pages = inject("$pages");
const router = useRouter();

const title = ref("");
const content = ref("");
const linkText = ref("");
const published = ref(true);

function submitForm() {
  if (!title.value || !content.value || !linkText.value) {
    alert("Please fill out all fields");
    return;
  }

  const newPage = {
    title: title.value,
    content: content.value,
    link: {
      text: linkText.value,
    },
    published: published.value,
  };
  pages.addPage(newPage);
  bus.$emit("page-created", newPage);

  router.push({ path: `/pages` });
}

const isFormInvalid = computed(
  () => !title.value || !content.value || !linkText.value
);

watch(title, (newTitle, oldTitle) => {
  if (linkText.value === oldTitle) {
    linkText.value = newTitle;
  }
});
</script>

<script>
export default {
  methods: {
    clearForm() {
      this.title = "";
      this.content = "";
      this.linkText = "";
      this.url = "";
      this.published = true;
    },
  },
};
</script>

<template>
  <div class="container my-5">
    <form action="">
      <div class="row">
        <div class="col-md-8">
          <div class="mb-3">
            <label for="" class="form-label">Page title</label>
            <input type="text" class="form-control" v-model="title" />
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Content</label>
            <textarea
              type="text"
              class="form-control"
              row="5"
              v-model="content"
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="" class="form-label">Link text</label>
            <input type="text" class="form-control" v-model="linkText" />
          </div>

          <div class="row mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="published"
              />
              <label class="form-check-label" for="gridCheck1">Published</label>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <button
            class="btn btn-primary"
            @click.prevent="submitForm"
            :disabled="isFormInvalid"
          >
            Create Page
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
