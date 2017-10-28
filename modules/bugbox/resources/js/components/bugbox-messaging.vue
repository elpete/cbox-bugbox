<template>
    <transition name="fade">
        <div class="alert alert-flash" :class="alertClass" role="alert" v-show="shouldShow">
            <i class="fa fa-times alert-close" @click="close"></i>
            <p v-if="internalMessages.length === 1" v-text="internalMessages[0]"></p>
            <ul v-else class="alert-flash-messages">
                <li v-for="message in internalMessages" v-text="message"></li>
            </ul>
        </div>
    </transition>
</template>

<script>
    export default {
        name : "bugbox-messaging",
        props: {
            "messages": {
                type: Array,
                default() {
                    return [];
                }
            },
            "type": {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                internalMessages: this.messages,
                messageType: this.type,
                show: false,
                timeoutHandle: null
            };
        },
        created() {
            Event.$on( 'newMessage', ({ messageType, messages, duration = 3000 }) => {
                this.messageType = messageType;
                this.internalMessages = messages;
                this.displayMessage( duration );
            } );
        },
        mounted() {
            if ( this.internalMessages.length ) {
                this.displayMessage();
            }
        },
        computed: {
            alertClass() {
                return `alert-${this.messageType}`;
            },
            body() {
                return this.internalMessages.join( "<br />" );
            },
            shouldShow() {
                return this.show && this.internalMessages.length > 0;
            }
        },
        methods: {
            displayMessage( duration = 3000 ) {
                if ( this.timeoutHandle ) {
                    clearTimeout( this.timeoutHandle );
                    this.timeoutHandle = null;
                }

                this.show = true;
                if ( duration > 0 ) {
                    this.timeoutHandle = setTimeout( this.close, duration );
                }
            },
            close() {
                this.show = false;
                clearTimeout( this.timeoutHandle );
                this.timeoutHandle = null;
            }
        }
    }
</script>

<style>
    .alert-flash {
        position: fixed;
        right: 25px;
        bottom: 25px;
        padding-top: 20px;
        padding-right: 25px;
        padding-left: 25px;
        z-index: 999;
        max-height: 300px;
        overflow: scroll;
    }

    .alert-flash-messages {
        padding-left: 15px;
    }

    .alert-close {
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to  {
      opacity: 0
    }
</style>
