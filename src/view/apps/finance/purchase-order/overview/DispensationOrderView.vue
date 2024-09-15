<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Fuel Purchase Order</sdHeading>
                <span>Set Up Fuel Purchase Order Information</span>
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
                        <a-form-Item label="Fuel Type">
                            <a-input
                                v-model:value="formState.fuel_type"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Quantity">
                            <a-input v-model:value="formState.quantity"  readonly/>
                        </a-form-Item>
                    </a-col>
                    
                </a-row>

                <a-row :gutter="16">
                   
                   
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Order Date">
                            <a-input
                                v-model:value="formState.order_date"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Order Number">
                            <a-input
                                v-model:value="formState.reference_number"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    
                </a-row>

               

                <div class="setting-form-actions">
                  
                    &nbsp; &nbsp;
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
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const DispensationOrderView = defineComponent({
    name: "DispensationOrderView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const unitsOfMeasures = ref([]);

        const formState = reactive({
            fuel_type: "",
            reference_number: "",
            order_date: "",
            quantity: "",
            description: "",
            supplier_name: "",
            quantity_measurement: "",
            quantity_abbreviation_id: "",
            unit_price_abbreviation_id: "",
            purchase_date: "",
            unit_price_measurement: "",
            invoice_no: "",
        });

        const fetchDispensationOrderDetails = async (dispensationOrderId) => {
            try {
                const response = await DataService.get(
                    `/dispensation_order/${dispensationOrderId}`,
                );
                console.log(
                    "Details fetched of dispensation order",
                    response.data,
                );
                const dispensationOrderDetails = response.data.dispense_order;
                return dispensationOrderDetails;
            } catch (error) {
                console.error("Error fetching fuel dispense order :", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchUnitsOfMeasures = async () => {
            try {
                const response3 = await DataService.get(`/units_of_measure`);
                console.log("Units of Measures fetched", response3.data);
                unitsOfMeasures.value = response3.data.Units;
            } catch (error) {
                console.error("Error fetching units of measures:", error);
                if (error.response3) {
                    console.error("Error response:", error.response3);
                }
            }
        };

        const updateDispensationOrderDetails = async (
            dispenseOrderId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/fuel_purchase_order/${dispenseOrderId}`,
                    updatedDetails,
                );
                console.log(
                    "Fuel dispense Order   updated successfully:",
                    response.data,
                );
            } catch (error) {
                console.error("Error updating Fuel dispense Order:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            await fetchUnitsOfMeasures();
            const dispenseOrderDetails = await fetchDispensationOrderDetails(
                props.id,
            );
            Object.assign(formState, dispenseOrderDetails);

            console.log(
                "Details of dispense order to be update",
                dispenseOrderDetails,
            );
            console.log("Fetched fuel type:", dispenseOrderDetails.fuel_type);
            console.log("Assigned form state fuel type:", formState.fuel_type);

            formState.fuel_type = dispenseOrderDetails.fuel_type;
            formState.quantity = dispenseOrderDetails.quantity;

            formState.reference_number =
                dispenseOrderDetails.dispense_reference_number;
                formState.order_date = dispenseOrderDetails.dispensation_order_date;
            formState.description = dispenseOrderDetails.description;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateDispensationOrderDetails(props.id, formState);
                toast.success("Fuel Dispense order  updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Fuel Dispense order updated successfully");
            } catch (error) {
                toast.error("Error updating Fuel Dispense order");
                console.error("Error updating Fuel Dispense order:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/dispensation-order`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
            unitsOfMeasures,
        };
    },
});

export default DispensationOrderView;
</script>

<style scoped>
.custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 12px;
    width: 180px;
    max-width: 300px; /* Adjust the width as needed */
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
