<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Unit of Measurement</sdHeading>
                <span>Set Up unit of measurement's Information</span>
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space>
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
                            <a-input v-model:value="formState.name" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Abbreviation">
                            <a-input
                                v-model:value="formState.abbreviation"
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
//import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const UnitOfMeasureView = defineComponent({
    name: "UnitOfMeasureView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        //  const toast = useToast();
        //const isLoading = ref(false);

        const formState = reactive({
            name: "",
            abbreviation: "",
        });

        const fetchUnitOfMeasureDetails = async (unitId) => {
            try {
                const response = await DataService.get(
                    `/units_of_measure/${unitId}`,
                );
                console.log(
                    "Details fetched of a unit of measure",
                    response.data,
                );
                const unitOfMeasureDetails = response.data.Unit;
                return unitOfMeasureDetails;
            } catch (error) {
                console.error(
                    "Error fetching units of measure details details:",
                    error,
                );
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const unitOfMeasureDetails = await fetchUnitOfMeasureDetails(
                props.id,
            );
            Object.assign(formState, unitOfMeasureDetails);
        });

        // const handleFinishFailed = (errors) => {
        //     console.log(errors);
        // };

        const handleCancel = () => {
            router.push(`/app/units-of-measures`);
        };

        return {
            formState,
            // handleFinish,
            // handleFinishFailed,
            handleCancel,
        };
    },
});

export default UnitOfMeasureView;
</script>
