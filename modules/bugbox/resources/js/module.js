import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import iView from 'iview';
import Bugbox from './components/bugbox';
import BugboxLogin from './components/bugbox-login';
import BugboxMessaging from './components/bugbox-messaging';
require("../less/bugbox.less");
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView);

// event bus
window.Event = new Vue();

// Global Store for VueX data
const store = new Vuex.Store(
{
  state: {},
  mutations: {
    appendToState ( state, payload ) {
        state[ payload.key ] = payload.value;	
    },
    updateGlobalData ( state, payload ) {
        state.globalData[ payload.key ] = payload.value;
    },
    setStatistic( state, payload ){
        state.statistics[ payload.key ] = payload.value;
    }
  },
  actions : {
  	fetchSettings(){
  		if( window.globalData && window.globaData.settings ){
  			this.commit( "appendToState", {
  				key : settings,
  				value : window.globalData.settings
  			} );
  		}
  	}
  },
  created(){
  	this.dispatch( "fetchSettings" );
  }
}
);

// We need to export this store for it to be available in components
export default store;

import { mapState } from 'vuex';

if ( document.getElementById( "app" ) ) {
	new Vue( {
	    el: "#app",
	    //VueX magic - import store and map the state object to the component object
	    store,
	    components : { 
	    	Bugbox,
	    	BugboxLogin,
	    	BugboxMessaging,
	    },
	    computed: mapState({
	        assetBagData : 'globalData'
	    })
	} );
}