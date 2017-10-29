<template>
    <div class="layout main-layout" v-if="settings">
        <div class="layout-ceiling">
            <div class="layout-ceiling-main">
                <router-link to="/foo"><Icon type="settings"></Icon> Settings</router-link> |
                <router-link to="/foo"><Icon type="person"></Icon> {{settings.user.fullName}}</router-link> |
                <a @click="processLogout"><Icon type="android-exit"></Icon> Logout</a>
            </div>
        </div>
        <div class="layout-header">
            <div class="layout-logo">
            	
            </div>
            <div class="layout-nav">
            	<MenuItem name="1">
            		<router-link to="/dashboard">
	                    <Icon type="bug"></Icon>
	                    Dashboard
	                </router-link>
                </MenuItem>
                <MenuItem name="2">
                	<router-link to="/summary">
	                    <Icon type="ios-keypad"></Icon>
	                    Summary
	                </router-link>
                </MenuItem>
                <MenuItem name="3">
                	<router-link to="/detail">
	                    <Icon type="ios-analytics"></Icon>
	                    Detail
	                </router-link>
                </MenuItem>
                <MenuItem name="4">
                	<router-link to="/settings/rules">
	                    <Icon type="gear-b"></Icon>
	                    Rules
	                </router-link>
                </MenuItem>
            </div>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">
                <router-view></router-view>
            </div>
        </div>
        <div class="layout-copy">
            BugBox
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name : "bugbox",
        computed : mapState( [ 'settings' ] ),
        methods:{
        	processLogout(){
        		
        	}
        }
    }
</script>