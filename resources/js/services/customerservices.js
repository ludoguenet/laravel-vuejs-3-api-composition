import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";

export default function useCustomers() {
    const errors = ref('');
    const customer = ref([]);
    const customers = ref([]);

    const getCustomers = async () => {
        let response = await axios.get('/api/customers');
        customers.value = response.data.data;
    };

    const getCustomer = async (id) => {
        let response = await axios.get('/api/customers/' + id);
        customer.value = response.data.data;
    };

    const createCustomer = async (data) => {
        errors.value = '';
        try {
            await axios.post('/api/customers', data);
            await router.push({name: 'customers.index'});
        } catch (error) {
            const createCustomerErrors = error.response.data.errors;

            for (const key in createCustomerErrors) {
                errors.value += createCustomerErrors[key][0] + ' ';
            }
        }
    };

    const updateCustomer = async (id) => {
        errors.value = '';
        try {
            await axios.put('/api/customers/' + id, customer.value);
            await router.push({name: 'customers.index'});
        } catch (error) {
            const createCustomerErrors = error.response.data.errors;

            for (const key in createCustomerErrors) {
                errors.value += createCustomerErrors[key][0] + ' ';
            }
        }
    };

    const destroyCustomer = async (id) => {
        if (!window.confirm('Supprimer ce client ?')) return;

        await axios.delete('/api/customers/' + id);
        await getCustomers();
    };

    return {
        customers,
        customer,
        errors,
        getCustomer,
        getCustomers,
        createCustomer,
        updateCustomer,
        destroyCustomer
    };
}
