<template>
    <a-row justify="center">
        <a-col :xxl="6" :xl="8" :md="12" :sm="18">
            <AuthWrapper>
                <div class="ninjadash-authentication-top">
                    <h2 class="ninjadash-authentication-top__title">
                        Register New Account
                    </h2>
                </div>
                <div class="ninjadash-authentication-content">
                    <a-form
                        name="register"
                        :model="formState"
                        @submit="handleSubmit"
                        layout="vertical"
                    >
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item
                                    label="First Name"
                                    name="first_name"
                                    :rules="[
                                        {
                                            required: true,
                                            message:
                                                'Please enter your First name!',
                                        },
                                    ]"
                                >
                                    <a-input
                                        v-model:value="formState.first_name"
                                        placeholder="First name"
                                    />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item
                                    label="Last Name"
                                    name="last_name"
                                    :rules="[
                                        {
                                            required: true,
                                            message:
                                                'Please enter your Last name!',
                                        },
                                    ]"
                                >
                                    <a-input
                                        v-model:value="formState.last_name"
                                        placeholder="Last name"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item
                                    name="email"
                                    label="Email Address"
                                    :rules="[
                                        {
                                            required: true,
                                            message:
                                                'Please enter a valid email!',
                                        },
                                    ]"
                                >
                                    <a-input
                                        type="email"
                                        v-model:value="formState.email"
                                        placeholder="user@example.com"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item
                                    name="phone"
                                    label="Phone"
                                    :rules="[
                                        {
                                            required: true,
                                            message:
                                                'Please enter phone number!',
                                        },
                                    ]"
                                >
                                    <a-input
                                        type="text"
                                        v-model:value="formState.phone"
                                        placeholder="+254 717960820"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <a-form-item
                            label="Password"
                            name="password"
                            :rules="[
                                {
                                    required: true,
                                    message: 'Please enter your password!',
                                },
                            ]"
                        >
                            <a-input
                                type="password"
                                v-model:value="formState.password"
                                placeholder="Password"
                            />
                        </a-form-item>

                        <a-form-item
                            label="Confirm Password"
                            name="password_confirmation"
                            :rules="[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                            ]"
                        >
                            <a-input
                                type="password"
                                v-model:value="formState.password_confirmation"
                                placeholder="Password Confirmation"
                            />
                        </a-form-item>
                        <div class="ninjadash-auth-extra-links">
                            <a-checkbox @change="onChange">
                                Creating an account means you’re okay with our
                                Terms of Service and Privacy Policy
                            </a-checkbox>
                        </div>
                        <a-form-item>
                            <sdButton
                                class="btn-signin"
                                htmlType="submit"
                                type="primary"
                                :class="{ loading: isLoading }"
                            >
                                <template v-if="isLoading">
                                    <a-spin />
                                    <span style="color: #0d79df"
                                        >Registering</span
                                    >
                                </template>
                                <template v-else> Create Account </template>
                            </sdButton>
                        </a-form-item>
                    </a-form>
                </div>
                <!-- <div class="ninjadash-authentication-bottom">
                    <p>
                        Already have an account?<router-link to="/auth/login"
                            >Sign In</router-link
                        >
                    </p>
                </div> -->
            </AuthWrapper>
        </a-col>
    </a-row>
</template>
<script>
import { DataService } from "@/config/dataService/dataService";
import { AuthWrapper } from "./style";
import { reactive, ref, defineComponent, h } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { LoadingOutlined } from "@ant-design/icons-vue";

const SignUp = defineComponent({
    name: "SignUp",
    components: { AuthWrapper },
    setup() {
        const { dispatch } = useStore();
        //const isLoading = computed(() => state.auth.loading);
        const checked = ref(null);
        const router = useRouter();
        const toast = useToast();

        const onChange = (check) => {
            checked.value = check;
        };
        const formState = reactive({
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            password: "",
            password_confirmation: "",
        });

        const isLoading = ref(false);

        const handleSubmit = async () => {
            try {
                isLoading.value = true;
                const response = await DataService.post("/register", formState);

                console.log(
                    "First Register Response",
                    JSON.stringify(response.data),
                );

                if (response.status === 201) {
                    localStorage.setItem("access_token", response.data.access_token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    dispatch("register", response.data);

                    router.push("/auth/login");
                    toast.success("Succesfully registered, Please Login!");
                } else {
                    console.error("Registration Failed");
                }
            } catch (error) {
                console.error("Registration error", error);
            } finally {
                isLoading.value = false;
            }
        };

        const indicator = h(LoadingOutlined, {
            style: {
                fontSize: "24px",
            },
            spin: true,
        });

        return {
            onChange,
            handleSubmit,
            formState,
            indicator,
            isLoading,
        };
    },
});

export default SignUp;
</script>

<style scoped>
.btn-signin {
    background-color: #5b8def; /* primary color */
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    transition:
        background-color 0.3s,
        transform 0.3s;
}

.btn-signin:hover {
    background-color: #3a6fb0; /* darker shade for hover effect */
    transform: scale(1.05);
}

.btn-signin.loading {
    background-color: #ffff; /* loading state color */ /* loading state color */
}

.loading-icon {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>
