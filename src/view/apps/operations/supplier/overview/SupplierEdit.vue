<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Supplier</sdHeading>
                <span>Set Up supplier's Information</span>
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space class="loading">
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
            <a-form
                :model="formState"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Name">
                            <a-input v-model:value="formState.full_name" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Email">
                            <a-input v-model:value="formState.email" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Phone">
                            <a-input v-model:value="formState.phone" />
                        </a-form-Item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Website">
                            <a-input v-model:value="formState.website" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Postal Code">
                            <a-input v-model:value="formState.postal_code" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Address">
                            <a-input v-model:value="formState.address" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <!-- <a-col :span="8">
                    <a-form-item label="Country" name="country_id">
                        <a-select
                            v-model:value="form.country_id"
                            placeholder="Select country"
                        >
                            <a-select-option
                                value="country_id"
                                >{{
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="State" name="state_id">
                        <a-select
                            v-model:value="form.state_id"
                            placeholder="Select State"
                        >
                            <a-select-option
                                value="state_id"
                                >{{
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="City" name="city_id">
                        <a-select
                            v-model:value="form.city_id"
                            placeholder="Select City"
                        >
                            <a-select-option value="city_id"></a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col> -->

                <div class="setting-form-actions">
                    <sdButton size="default" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
                    <sdButton
                        size="default"
                        @click.prevent="handleCancel"
                        type="light"
                    >
                        Cancel
                    </sdButton>
                </div>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const SupplierEdit = defineComponent({
    name: "SupplierEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            name: "",
            email: "",
            phone: "",
            website: "",
            postal_code: "",
            address: "",
            // country_id: "",
            // state_id: "",
            // city_id: "",
            description: "",
            full_name: "",
        });

        const fetchSupplierDetails = async (supplierId) => {
            try {
                const response = await DataService.get(
                    `/suppliers/${supplierId}`,
                );
                console.log("Details fetched of a  supplier", response.data);
                const supplierDetails = response.data.Supplier;
                return supplierDetails;
            } catch (error) {
                console.error("Error fetching supplier:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateSupplierDetails = async (supplierId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/suppliers/${supplierId}`,
                    updatedDetails,
                );
                console.log("Supplier  updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating supplier:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const supplierDetails = await fetchSupplierDetails(props.id);
            Object.assign(formState, supplierDetails);

            formState.full_name = `${supplierDetails.title} ${supplierDetails.first_name} ${supplierDetails.last_name}`;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateSupplierDetails(props.id, formState);
                toast.success("Supplier  updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Supplier updated successfully");
            } catch (error) {
                toast.error("Error updating Supplier");
                console.error("Error updating Supplier:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/suppliers`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default SupplierEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
