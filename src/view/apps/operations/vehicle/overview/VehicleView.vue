<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Vehicle's Info</sdHeading>
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
                        <a-form-Item label="Name">
                            <a-input
                                v-model:value="formState.vehicle_name"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Registration Number">
                            <a-input
                                v-model:value="formState.registration_no"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Color">
                            <a-input
                                v-model:value="formState.vehicle_color"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Odometer Reading">
                            <a-input
                                v-model:value="formState.odometer_reading"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Engine  Number">
                            <a-input
                                v-model:value="formState.engine_no"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Chassis Number">
                            <a-input
                                v-model:value="formState.chassis_no"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>
<a-row :gutter="16">
                <a-col :span="8">
                    <a-form-Item label="Current Fuel Tank Level">
                        <a-input
                            v-model:value="formState.current_fuel_tank_level"
                            readonly
                            Litres
                        />
                    </a-form-Item>
                </a-col>
            </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Description">
                            <a-textarea
                                v-model:value="formState.description"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

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
import { useRouter } from "vue-router";

const VehicleView = defineComponent({
    name: "VehicleView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();

        const formState = reactive({
            vehicle_name: "",
            vehicle_brand_id: "",
            registration_no: "",
            vehicle_color: "",
            odometer_reading: "",
            engine_no: "",
            chassis_no: "",
            description: "",
            current_fuel_tank_level: "",
        });
        const fetchVehicleDetails = async (vehicleId) => {
            try {
                const response = await DataService.get(`/vehicle/${vehicleId}`);
                console.log("Details fetched of a Vehicle", response.data);

                const vehicleDetails = response.data.Vehicle;
                return vehicleDetails;
            } catch (error) {
                console.error("Error fetching vehicle details:", error);

                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const vehicleDetails = await fetchVehicleDetails(props.id);
            // Populate formState with driverDetails
            Object.assign(formState, vehicleDetails);
        });

        const handleFinish = (values) => {
            this.values = { ...values, tags: this.tags };
            console.log(values, formState);
        };

        const handleCancel = () => {
            router.push(`/app/vehicles`);
        };
        return {
            formState,
            handleFinish,
            handleCancel,
        };
    },
});

export default VehicleView;
</script>

<style scoped>
.status-active {
    background-color: #0d79df;
    color: white; /* Change text color for better contrast */
    border-radius: 10px; /* Adjust the radius as needed */
    padding: 0.5px; /* Add some padding */
}
</style>
