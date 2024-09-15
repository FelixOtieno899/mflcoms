<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Supplier Info</sdHeading>
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space>
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
            <a-form :model="formState" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Name">
                            <a-input v-model:value="formState.name" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Email">
                            <a-input v-model:value="formState.email" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Phone">
                            <a-input v-model:value="formState.phone" readonly />
                        </a-form-Item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Website">
                            <a-input
                                v-model:value="formState.website"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Postal Code">
                            <a-input
                                v-model:value="formState.postal_code"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Address">
                            <a-input
                                v-model:value="formState.address"
                                readonly
                            />
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
                             readonly
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
                             readonly
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
                        <a-select-option value="city_id"  readonly></a-select-option>
                    </a-select>
                </a-form-item>
            </a-col> -->

                <div class="setting-form-actions">
                    <sdButton size="default" @click="handleCancel" type="light">
                        Back
                    </sdButton>
                </div>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, reactive, onMounted } from "vue";
//import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const SupplierCreateBill = defineComponent({
    name: "SupplierCreateBill",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        //  const toast = useToast();
        //const isLoading = ref(false);

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
        });

        const fetchSupplierDetails = async (supplierId) => {
            try {
                const response = await DataService.get(
                    `/suppliers/${supplierId}`,
                );
                console.log("Details fetched of supplier", response.data);
                const supplierDetails = response.data.Supplier;
                return supplierDetails;
            } catch (error) {
                console.error("Error fetching supplier:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const supplierDetails = await fetchSupplierDetails(props.id);
            Object.assign(formState, supplierDetails);
        });

        // const handleFinishFailed = (errors) => {
        //     console.log(errors);
        // };

        const handleCancel = () => {
            router.push(`/app/suppliers`);
        };

        return {
            formState,
            // handleFinish,
            // handleFinishFailed,
            handleCancel,
        };
    },
});

export default SupplierCreateBill;
</script>
