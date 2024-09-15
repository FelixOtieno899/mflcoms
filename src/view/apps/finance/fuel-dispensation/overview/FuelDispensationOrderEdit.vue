<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edi Fuel Dispensation Order</sdHeading>
                <span>Set Up Fuel Dispensation Order Information</span>
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
                    <a-col :span="4">
                        <a-form-Item label="Fuel Purchase Reference Number">
                            <a-input
                                v-model:value="formState.refrence_number"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Fuel Type">
                            <a-input
                                v-model:value="formState.fuel_type"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Quantity">
                            <a-input v-model:value="formState.quantity" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Quantity Measurement">
                            <a-input
                                v-model:value="formState.quantity_measurement"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Dispense Date">
                            <a-input v-model:value="formState.dispense_date" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Dispense Location">
                            <a-input
                                v-model:value="formState.dispense_location"
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Truck">
                            <a-input
                                v-model:value="
                                    formState.truck_registration_number
                                "
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Odometer Reading">
                            <a-input
                                v-model:value="formState.odometer_reading"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <!-- <a-col :span="8">
                        <a-form-Item label="DeliverNote Reference No">
                            <a-input
                                v-model:value="formState.delivery_note_id"
                                readonly
                            />
                        </a-form-Item>
                    </a-col> -->
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

const FuelDispensationOrderEdit = defineComponent({
    name: "FuelDispensationOrderEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            refrence_number: "",
            fuel_type: "",
            quantity: "",
            quantity_measurement: "",
            truck_registration_number: "",
            dispense_location: "",
            dispense_date: "",
            delivery_note_id: "",
            odometer_reading: "",
        });

        const fetchFuelDispensationOrderDetails = async (
            fuelDispensationOrderId,
        ) => {
            try {
                const response = await DataService.get(
                    `/fuel_dispensation_order/${fuelDispensationOrderId}`,
                );
                console.log(
                    "Details fetched of fuel dispensation order",
                    response.data,
                );
                const fuelDispensationOrderDetails =
                    response.data.Fuel_dispensation_order;
                return fuelDispensationOrderDetails;
            } catch (error) {
                console.error(
                    "Error fetching fuel dispensation order :",
                    error,
                );
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateFuelDispensationOrderDetails = async (
            fuelDispensationOrderId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/fuel_dispensation_order/${fuelDispensationOrderId}`,
                    updatedDetails,
                );
                console.log(
                    "Fuel Dispensation Order   updated successfully:",
                    response.data,
                );
            } catch (error) {
                console.error("Error updating Fuel Dispensation Order:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const fuelDispensationOrderDetails =
                await fetchFuelDispensationOrderDetails(props.id);
            Object.assign(formState, fuelDispensationOrderDetails);

            console.log(
                "Fuel Dispesation detail",
                fuelDispensationOrderDetails,
            );

            formState.refrence_number = fuelDispensationOrderDetails.purchase_order.reference_number;
            formState.fuel_type =
                fuelDispensationOrderDetails.purchase_order.fuel_type;

            formState.quantity = fuelDispensationOrderDetails.quantity;

            formState.quantity_measurement =
                fuelDispensationOrderDetails.quantityabbreviationid.name;

            formState.truck_registration_number =
                fuelDispensationOrderDetails.vehicle.registration_no;

            formState.dispense_date =
                fuelDispensationOrderDetails.dispense_date;

            formState.dispense_location =
                fuelDispensationOrderDetails.dispense_location;

            formState.odometer_reading =
                fuelDispensationOrderDetails.odometer_reading;

            formState.delivery_note_id =
                fuelDispensationOrderDetails.delivery_note_id;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateFuelDispensationOrderDetails(props.id, formState);
                toast.success(
                    "Fuel Dispensation  order  updated successfully!",
                );
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Fuel Dispeantion  order updated successfully");
            } catch (error) {
                toast.error("Error updating Fuel Dispenation order");
                console.error(
                    "Error updating Fuel Dispensation  order:",
                    error,
                );
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/fuel-dispensation-order`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default FuelDispensationOrderEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
