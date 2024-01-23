<template>
  <h4>Pages</h4>
  <div class="text-end" text-end>
    <router-link
      :to="`/pages/create`"
      class="btn btn-primary"
      active-class="active"
    >
      New Page
    </router-link>
  </div>

  <table class="table table-hover">
    <thead>
      <tr>
        <th>Title</th>
        <th>Link text</th>
        <th>Is Published</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(page, index) in pages.getAllPages()"
        :key="index"
        @click.prevent="goToPage(index)"
      >
        <td>{{ page.title }}</td>
        <td>{{ page.link.text }}</td>
        <td>{{ page.published ? "yes" : "no" }}</td>
        <td>
          <button
            class="btn btn-danger"
            @click.prevent.stop="deletePage(index)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, reactive, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const counter = ref(0);
    const data = reactive({ counter: 0 });
    const pages = inject("$pages");
    const bus = inject("$bus");

    const router = useRouter();

    function deletePage(index) {
      pages.removePage(index);
      bus.$emit("page-deleted", { index });
    }

    function goToPage(index) {
      router.push({ path: `/pages/${index}/edit` });
    }

    function click() {
      counter.value++;
      data.counter++;
    }

    return {
      counter,
      data,
      click,
      pages,
      goToPage,
      deletePage,
    };
  },
};
</script>

<style scope>
.table.table-hover {
  cursor: pointer;
}
</style>
