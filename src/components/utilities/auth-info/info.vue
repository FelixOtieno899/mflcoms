<template>
    <InfoWraper>
        <SearchBar />
        <Message />
        <Notification />
        <!-- <Settings /> -->
        <!-- <Support /> -->
        <div
            class="ninjadash-nav-actions__item ninjadash-nav-actions__language"
        >
            <sdDropdown placement="bottomRight" :action="['click']">
                <template v-slot:overlay>
                    <NavAuth>
                        <router-link
                            @click="() => onFlagChangeHandle('english')"
                            to="#"
                        >
                            <img
                                :src="
                                    require('../../../static/img/flag/english.png')
                                "
                                alt=""
                            />
                            <span>English</span>
                        </router-link>
                        <router-link
                            @click="() => onFlagChangeHandle('germany')"
                            to="#"
                        >
                            <img
                                :src="
                                    require('../../../static/img/flag/germany.png')
                                "
                                alt=""
                            />
                            <span>Germany</span>
                        </router-link>
                        <router-link
                            @click="() => onFlagChangeHandle('spain')"
                            to="#"
                        >
                            <img
                                :src="
                                    require('../../../static/img/flag/spain.png')
                                "
                                alt=""
                            />
                            <span>Spain</span>
                        </router-link>
                        <router-link
                            @click="() => onFlagChangeHandle('turky')"
                            to="#"
                        >
                            <img
                                :src="
                                    require('../../../static/img/flag/turky.png')
                                "
                                alt=""
                            />
                            <span>Turky</span>
                        </router-link>
                    </NavAuth>
                </template>
                <a to="#" class="ninjadash-nav-action-link">
                    <img
                        :src="require(`../../../static/img/flag/${flag}.png`)"
                        alt=""
                    />
                </a>
            </sdDropdown>
        </div>

        <div class="ninjadash-nav-actions__item ninjadash-nav-actions__author">
            <sdPopover placement="bottomRight" action="click">
                <template v-slot:content>
                    <UserDropDown>
                        <div class="user-dropdown">
                            <figure class="user-dropdown__info">
                                <img
                                    :src="
                                        require('../../../static/img/avatar/chat-auth.png')
                                    "
                                    alt=""
                                />
                                <figcaption v-if="loggedUser">
                                    <sdHeading as="h5">
                                        {{ loggedUser.first_name }} {{ loggedUser.last_name }}
                                    </sdHeading>
                                    <p>Supervisor</p>
                                </figcaption>
                            </figure>
                            <ul class="user-dropdown__links">
                                <li>
                                    <a to="#">
                                        <unicon name="user"></unicon> Profile
                                    </a>
                                </li>
                                <li>
                                    <a to="#">
                                        <unicon name="setting"></unicon>
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a to="#">
                                        <unicon name="dollar-sign"></unicon>
                                        Billing
                                    </a>
                                </li>
                                <li>
                                    <a to="#">
                                        <unicon name="users-alt"></unicon>
                                        Activity
                                    </a>
                                </li>
                                <li>
                                    <a to="#">
                                        <unicon name="bell"></unicon> Help
                                    </a>
                                </li>
                            </ul>
                            <a
                                @click="SignOut"
                                class="user-dropdown__bottomAction"
                                href="#"
                            >
                                <LogoutOutlined /> Sign Out
                            </a>
                        </div>
                    </UserDropDown>
                </template>
                <a to="#" class="ninjadash-nav-action-link">
                    <a-avatar
                        :src="
                            require('../../../static/img/avatar/chat-auth.png')
                        "
                    />
                    <span v-if="loggedUser" class="ninjadash-nav-actions__author--name">
                        {{ loggedUser.first_name }}
                    </span>
                    <span v-else class="ninjadash-nav-actions__author--name">
                        Guest
                    </span>
                    <unicon name="angle-down"></unicon>
                </a>
            </sdPopover>
        </div>
    </InfoWraper>
</template>

<script setup>
import { InfoWraper, NavAuth, UserDropDown } from "./auth-info-style";
// import Support from "./Support";
//import Settings from './Settings.vue';
import Notification from "./Notification.vue";
import Message from "./Message.vue";
import SearchBar from "./Search.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { LogoutOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";

console.log("User logged in:");

let flag = "english";
const { dispatch, state } = useStore();
const { push } = useRouter();

const loggedUser = computed(() => state.auth.user);

console.log("Currently logged user", loggedUser.value);

const SignOut = (e) => {
    e.preventDefault();
    dispatch("logOut");
    push("/auth/login");
};

const onFlagChangeHandle = (value) => {
    flag = value;
};
</script>
