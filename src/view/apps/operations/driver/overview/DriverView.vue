<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Driver's Info</sdHeading>
            </div>
        </template>

        <sdUserCard>
            <div class="card user-card">
                <sdCards headless>
                    <!-- <figure>
                  <img :src="require(`@/${img}`)" alt="" />
                </figure> -->
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <div style="background: #ececec; padding: 20px">
                                <a-card
                                    title="Driver's Bio Data"
                                    :bordered="false"
                                    style="width: 300px"
                                >
                                    <p style="margin-right: 125px">
                                        Name:
                                        {{ formState.first_name }}

                                        {{ formState.last_name }}
                                    </p>

                                    <p style="margin-right: 110px">
                                        ID Number: {{ formState.national_id }}
                                    </p>

                                    <p style="margin-right: 175px">
                                        Status:
                                        <span
                                            :class="{
                                                'ninjadash-status':
                                                    formState.status ===
                                                    'active',
                                            }"
                                        >
                                            {{ formState.status }}
                                        </span>
                                    </p>
                                </a-card>
                            </div>
                        </a-col>
                    </a-row>
                </sdCards>
            </div>
        </sdUserCard>
        <BasicFormWrapper>
            <a-form
                :model="formState"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Date of Birth">
                            <a-input
                                v-model:value="formState.date_of_birth"
                               readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Phone">
                            <a-input v-model:value="formState.phone" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="NSSF">
                            <a-input
                                v-model:value="formState.nssf_number"
                               readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="NHIF">
                            <a-input
                                v-model:value="formState.nhif_number"
                               readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="KRA Pin">
                            <a-input
                                v-model:value="formState.kra_pin"
                               readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Driver License Number">
                            <a-input
                                v-model:value="formState.bank_name"
                               readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Bank Account Name">
                            <a-input
                                v-model:value="formState.bank_name"
                               readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Bank Account Number">
                            <a-input
                                v-model:value="formState.bank_account_number"
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

const DriverView = defineComponent({
    name: "DriverView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const formState = reactive({
            first_name: "",
            last_name: "",
            national_id: "",
            date_of_birth: "",
            phone: "",
            nssf_number: "",
            nhif_number: "",
            kra_pin: "",
            license_no: "",
            bank_name: "",
            bank_account_number: "",
            address: "",
        });
        const fetchDriverDetails = async (driverId) => {
            try {
                const response = await DataService.get(`/driver/${driverId}`);
                console.log("Details fetched of a driver", response.data);

                const driverDetails = response.data.Driver;
                return driverDetails;
            } catch (error) {
                console.error("Error fetching driver details:", error);

                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const driverDetails = await fetchDriverDetails(props.id);
            // Populate formState with driverDetails
            Object.assign(formState, driverDetails);
        });

        const handleFinish = (values) => {
            this.values = { ...values, tags: this.tags };
            console.log(values, formState);
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/drivers`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default DriverView;
</script>

<style scoped>
.status-active {
    background-color: #0d79df;
    color: white; /* Change text color for better contrast */
    border-radius: 10px; /* Adjust the radius as needed */
    padding: 0.5px; /* Add some padding */
}
</style>
