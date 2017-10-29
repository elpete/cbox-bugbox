<template>
	<div class="layout login-layout" v-if="!settings">
        <div class="layout-content">
            <div class="layout-content-main">        
            	<Col class="login-box fade-slow" span="8" offset="8">
                	<h1 class="login-logo text-center">
                		<Icon type="bug" class="text-danger" />
						BugBox
					</h1>

			       	<div class="login-box-body col-12">
						<overlay-blocker v-if="isProcessing" v-bind:message="processingMessage"></overlay-blocker>

						<form action="javascript:void(0)" v-on:submit="processLogin">
							<Row class="form-group">
								<h6>Username:</h6>
								<Input v-model="username" icon="person" placeholder="Enter username"></Input>
								<h6>Password:</h6>
								<Input v-model="password" icon="locked" type="password" placeholder="Enter password"></Input>
							</Row>
							<Row><br></Row>
							<Row class="submits">
								<Button type="success" long>Login</Button>
							</Row>

						</form>

						<Row class="submits text-center">
							<small>
								<a href="#" class="text-muted">Forgot Password?</a>
							</small>
						</Row>
					</div>
			    </Col>
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