<template>
    <div v-if="errors !== ''">
        {{ errors }}
    </div>
    <form class="space-y-6" @submit.prevent="saveCustomer">
        <div>
            <label for="name" class="block">Nom du client</label>
            <input type="text" id="name" v-model="customer.name">
        </div>
        <div>
            <label for="tel" class="block">Tél. du client</label>
            <input type="text" id="tel" v-model="customer.tel">
        </div>
        <div>
            <label for="is_favourite" class="block">Favori ?</label>
            <input type="checkbox" id="is_favourite" v-model="customer.is_favourite">
        </div>
        <button type="submit" class="bg-blue-500 px-2 py-1 text-white rounded">Mettre à jour</button>
    </form>
</template>

<script>
import { reactive } from "vue";
import { onMounted } from "vue";
import useCustomers from "../services/customerservices.js";

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup(props) {
        const { getCustomer, customer, updateCustomer, errors } = useCustomers();

        onMounted(getCustomer(props.id));

        const saveCustomer = async () => {
            await updateCustomer(props.id);
        };

        return {
            saveCustomer,
            customer,
            errors
        }
    }
}
</script>
