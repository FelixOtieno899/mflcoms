<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Vehicle Brand's Info</sdHeading>
            </div>
        </template>

        <BasicFormWrapper>
            <a-form
                :model="formState"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Model">
                            <a-input v-model:value="formState.model" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Year">
                            <a-input v-model:value="formState.year" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Axles">
                            <a-input v-model:value="formState.axles" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Gearbox">
                            <a-input v-model:value="formState.gearbox" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Length">
                            <a-input v-model:value="formState.vehicle_length" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Width">
                            <a-input v-model:value="formState.width" disabled />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Height">
                            <a-input v-model:value="formState.height" />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-Item label="Suspension">
                            <a-input v-model:value="formState.suspension" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Description">
                            <a-textarea v-model:value="formState.description" />
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
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const VehicleBrandView = defineComponent({
    name: "VehicleBrandView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            model: "",
            year: "",
            axles: "",
            gearbox: "",
            vehicle_length: "",
            width: "",
            height: "",
            suspension: "",
            description: "",
        });
        const fetchVehicleBrandsDetails = async (brandId) => {
            try {
                const response = await DataService.get(
                    `/vehicle/brand/${brandId}`,
                );
                console.log(
                    "Details fetched of a Vehicle brand",
                    response.data,
                );

                const vehicleBrandDetails = response.data.Vehicle_brand;
                return vehicleBrandDetails;
            } catch (error) {
                console.error("Error fetching vehicle brand details:", error);

                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateVehicleBrandDetails = async (brandId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/vehicle/brand/${brandId}`,
                    updatedDetails,
                );
                console.log(
                    "Vehicle Brand updated successfully:",
                    response.data,
                );
            } catch (error) {
                console.error("Error updating brand details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const vehicleBrandDetails = await fetchVehicleBrandsDetails(
                props.id,
            );
            // Populate formState with driverDetails
            Object.assign(formState, vehicleBrandDetails);
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateVehicleBrandDetails(props.id, formState);
                toast.success("Vehicle Brand updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Vehicle brand details updated successfully");
            } catch (error) {
                toast.error("Error updating vehicle brand  details");
                console.error("Error updating vehicle brand details:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/vehicle-brands`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default VehicleBrandView;
</script>

<style scoped>
.status-active {
    background-color: #0d79df;
    color: white; /* Change text color for better contrast */
    border-radius: 10px; /* Adjust the radius as needed */
    padding: 0.5px; /* Add some padding */
}
</style>
