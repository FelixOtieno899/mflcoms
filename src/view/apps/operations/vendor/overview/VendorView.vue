<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Vendor's Info</sdHeading>
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
                    <a-col :span="12">
                        <a-form-Item label="Name">
                            <a-input v-model:value="formState.type" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Status">
                            <a-input
                                v-model:value="formState.status"
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

const VendorView = defineComponent({
    name: "VendorView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        // const toast = useToast();
        //const isLoading = ref(false);

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

        onMounted(async () => {
            const vendorDetails = await fetchVendorDetails(props.id);
            Object.assign(formState, vendorDetails);
        });

        const handleCancel = () => {
            router.push(`/app/vendors`);
        };

        return {
            formState,
            // handleFinish,
            //handleFinishFailed,
            handleCancel,
        };
    },
});

export default VendorView;
</script>
