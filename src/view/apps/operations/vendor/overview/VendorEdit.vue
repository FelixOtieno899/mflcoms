<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Insurer</sdHeading>
                <span>Set Up insurer's Information</span>
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
                    <a-col :span="12">
                        <a-form-Item label="Name">
                            <a-input v-model:value="formState.type" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Status">
                            <a-input
                                v-model:value="formState.status"
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

              
                <div class="setting-form-actions">
                    <sdButton size="default" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
                    <sdButton size="default" @click="handleCancel" type="light">
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

const VendorEdit = defineComponent({
    name: "VendorEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            type: "",
            status: "",
            
        });

       
        const fetchVendorDetails = async (vendorId) => {
            try {
                const response = await DataService.get(
                    `/vendor_type/${vendorId}`,
                );
                console.log("Details fetched of a vendor", response.data);
                const vendorDetails = response.data.Vendor_type;
                return vendorDetails;
            } catch (error) {
                console.error("Error fetching vendor details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };
        const updateVendorDetails = async (vendorId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/vendor_type/${vendorId}`,
                    updatedDetails,
                );
                console.log("vendor updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating vendor details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const vendorDetails = await fetchVendorDetails(props.id);
            Object.assign(formState, vendorDetails);
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateVendorDetails(props.id, formState);
                toast.success("vendor updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Vendor details updated successfully");
            } catch (error) {
                toast.error("Error updating vendor details");
                console.error("Error updating vendor details:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/vendors`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default VendorEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>