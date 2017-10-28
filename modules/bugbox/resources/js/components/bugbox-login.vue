<template>
	<div class="layout" v-if="!settings">
		<div class="login-box fade-slow">
			<div class="login-logo">
				BugBox
			</div>

	       	<div class="login-box-body">
				<overlay-blocker v-if="isProcessing" v-bind:message="processingMessage"></overlay-blocker>

				<form action="javascript:void(0)" v-on:submit="processLogin">

					<div class="form-group">
						<div><label for="username">Username:</label></div>
						<input type="text" name="username"  v-model="username" class="form-control" />

						<div><label for="username">Password:</label></div>
						<input type="password" name="password" v-model="password" class="form-control" />
						<div class="clearfix"></div>
					</div>
					<div class="form-group submits text-center">
						<button class="btn btn-block btn-flat">Login</button>
					</div>

				</form>

				<div class="form-group text-center">
					<small>
						<a href="#" class="text-muted">Forgot Password?</a>
					</small>
				</div>
			</div>

	    </div>
	</div>
</template>

<script>

import { mapState } from 'vuex';

export default {
	name : 'bugbox-login',
	props: [],
	data : function(){
		return {
			username : "",
			password : "",
			isProcessing : false,
			processingMessage : "Processing login. Please wait...",
			loginEndpoint : "/security/api/v1/authentication"
		}
	},
	computed : mapState( {
		settings   : 'settings'
	} ),
	methods : { 
		processLogin: function(){
			var self = this;
			this.isProcessing = true;
			$.ajax( {
				method: 'POST',
				url: this.loginEndpoint,
				data: {
					username : this.username,
					password : this.password
				}
			} ).done( function( data, textStatus, jqXHR ){
				if( jqXHR.status == 201 ){			
					self.processingMessage = "Success! Redirecting you to the WEAT dashboard...";
					self.isProcessing = true;
					window.location.assign( "/" );
				} else {
					self.isProcessing = false;
					self.onAuthenticationFailed( data );
				}
			} ).fail( function( jqXHR, textStatus, errorThrown ){
				self.onAuthenticationFailed( jqXHR.responseJSON );
				self.isProcessing = false;
			} );
		},
		onAuthenticationFailed: function( data ){
			console.log( data );
			if( !data ){
				data = {
					messages : ["Authentication attempt failed.  Please check your credentials and try again"]
				};
			}
			Event.$emit( "newMessage", {
                messages: data.messages,
                messageType: "warning",
                duration: 5000
            } );
		}
	}
};
</script>