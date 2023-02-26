<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "./lib/supabaseClient";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const showModal = ref(false);
const updateModal = ref(false);
const loadings = ref(false);
const formData = ref("");
const upDateDDD = ref("");
const getIdsss = ref(0);
const saveData = ref([]);

const submitData = async () => {
	let { data, error, status } = await supabase
		.from("workOut")
		.insert([{ title: formData?.value }]);
	if (status === 201) {
		toast.info("Deleted successfully!", {
			autoClose: 2000,
		});
		getData();
	}
	formData.value = "";
	showModal.value = false;
	getData();
};

const getData = async () => {
	loadings.value = true;
	let { data } = await supabase.from("workOut").select("*");
	saveData.value = data;
	loadings.value = false;
};

const deleteData = async (id) => {
	const { status } = await supabase.from("workOut").delete().eq("id", id);
	if (status === 204) {
		toast.info("Deleted successfully!", {
			autoClose: 2000,
		});
		getData();
	}
};

const updateDta = async (data) => {
	upDateDDD.value = data.title;
	getIdsss.value = data.id;
	updateModal.value = true;
};

const updateSubmit = async () => {
	const { error, status } = await supabase
		.from("workOut")
		.update({ title: upDateDDD.value })
		.eq("id", getIdsss.value);
	if (status === 204) {
		toast.success("Updated successfully!", {
			autoClose: 2000,
		});
		getData();
	}

	updateModal.value = false;
};
onMounted(() => {
	getData();
});
</script>
<template>
	<main>
		<div
			v-show="showModal"
			class="fixed flex flex-col items-center justify-center inset-0 w-full h-full bg-black/20"
		>
			<div
				class="bg-white w-[500px] h-[200px] flex-col flex items-center justify-center rounded-md"
			>
				<button class="mb-10" @click="showModal = !showModal">X</button>
				<form @submit.prevent="submitData" @keyup.enter="submitData">
					<textarea class="border h-28 w-64" v-model="formData"> </textarea>
					<button type="submit" class="border bg-red-400 p-5">Add Note</button>
				</form>
			</div>
		</div>
		<div
			v-show="updateModal"
			class="fixed flex flex-col items-center justify-center inset-0 w-full h-full bg-black/20"
		>
			<div
				class="bg-white w-[500px] h-[200px] flex-col flex items-center justify-center rounded-md"
			>
				<button class="mb-10" @click="updateModal = false">X</button>
				<form @submit.prevent="updateSubmit">
					<textarea class="border h-28 w-64" v-model="upDateDDD"> </textarea>
					<button type="submit" class="border bg-red-400 p-5">Update</button>
				</form>
			</div>
		</div>
		<div class="container mx-auto w-[80%] mt-10">
			<div class="flex items-center justify-between mb-10">
				<h1 class="text-red-600 font-bold text-3xl">Notes!</h1>

				<button
					@click="showModal = !showModal"
					class="bg-black w-10 h-10 rounded-full text-white grid place-items-center"
				>
					+
				</button>
			</div>

			<h1>{{ loadings ? "Loading....................." : "" }}</h1>
			<div class="grid grid-cols-4 gap-5">
				<div
					class="bg-red-300 p-5 rounded-md h-fit flex flex-col justify-between"
					v-for="data in saveData"
					:key="data.id"
				>
					<p class="text-gray-200 text-xl font-semibold">{{ data.title }}</p>
					<p class="italic text-white text-lg font-medium my-5">
						ID: {{ data.id }}
					</p>
					<button @click="deleteData(data.id)" class="bg-white py-2">
						Delete
					</button>
					<button class="bg-white py-2 mt-2" @click="updateDta(data)">
						Update
					</button>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped></style>
