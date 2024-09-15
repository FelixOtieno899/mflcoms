<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Vehicle Brand's Info</sdHeading>
            </div>
        </template>

        <BasicFormWrapper>
            <a-form :model="formState" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Model">
                            <a-input v-model:value="formState.model" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Year">
                            <a-input v-model:value="formState.year" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Axles">
                            <a-input v-model:value="formState.axles" readonly />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Gearbox">
                            <a-input
                                v-model:value="formState.gearbox"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Length">
                            <a-input
                                v-model:value="formState.vehicle_length"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Width">
                            <a-input v-model:value="formState.width" readonly />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Height">
                            <a-input
                                v-model:value="formState.height"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-Item label="Suspension">
                            <a-input
                                v-model:value="formState.suspension"
                                readonly
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

const VehicleBrandView = defineComponent({
    name: "VehicleBrandView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();

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

        onMounted(async () => {
            const vehicleBrandDetails = await fetchVehicleBrandsDetails(
                props.id,
            );
            // Populate formState with driverDetails
            Object.assign(formState, vehicleBrandDetails);
        });

        // const handleFinish = (values) => {
        //     this.values = { ...values, tags: this.tags };
        //     console.log(values, formState);
        // };

        // const handleFinishFailed = (errors) => {
        //     console.log(errors);
        // };

        const handleCancel = () => {
            router.push(`/app/vehicle-brands`);
        };

        return {
            formState,
            handleCancel,
            // handleFinish,
            // handleFinishFailed,
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
