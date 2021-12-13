'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1124ad3c14f1a60097ccbc4e88a59883b349245c8ae2bbb20fc920e186231bc2f1be7b852716bb3fc47d8df44838b828ac4eea684d36c8f903d80536b9ea3b94"' : 'data-target="#xs-components-links-module-AppModule-1124ad3c14f1a60097ccbc4e88a59883b349245c8ae2bbb20fc920e186231bc2f1be7b852716bb3fc47d8df44838b828ac4eea684d36c8f903d80536b9ea3b94"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1124ad3c14f1a60097ccbc4e88a59883b349245c8ae2bbb20fc920e186231bc2f1be7b852716bb3fc47d8df44838b828ac4eea684d36c8f903d80536b9ea3b94"' :
                                            'id="xs-components-links-module-AppModule-1124ad3c14f1a60097ccbc4e88a59883b349245c8ae2bbb20fc920e186231bc2f1be7b852716bb3fc47d8df44838b828ac4eea684d36c8f903d80536b9ea3b94"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppServerModule.html" data-type="entity-link" >AppServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppServerModule-5f1758c94a373edea54a8ada5fe0b4cfe4424431dc814e567524ca4379be271bd7de1bff039cea864e02be62f49a097fac7b54696d1ac76be1aeb77056355890"' : 'data-target="#xs-components-links-module-AppServerModule-5f1758c94a373edea54a8ada5fe0b4cfe4424431dc814e567524ca4379be271bd7de1bff039cea864e02be62f49a097fac7b54696d1ac76be1aeb77056355890"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppServerModule-5f1758c94a373edea54a8ada5fe0b4cfe4424431dc814e567524ca4379be271bd7de1bff039cea864e02be62f49a097fac7b54696d1ac76be1aeb77056355890"' :
                                            'id="xs-components-links-module-AppServerModule-5f1758c94a373edea54a8ada5fe0b4cfe4424431dc814e567524ca4379be271bd7de1bff039cea864e02be62f49a097fac7b54696d1ac76be1aeb77056355890"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-84b1cac9bbc83abd0c1c4bd514c64d4ef14e94bde751c097e633f233a0e132cb1ba9eb383fa7d346d87d639bdf46b80d037c923ffc52cfdd1eae53d6a79a5462"' : 'data-target="#xs-components-links-module-AuthModule-84b1cac9bbc83abd0c1c4bd514c64d4ef14e94bde751c097e633f233a0e132cb1ba9eb383fa7d346d87d639bdf46b80d037c923ffc52cfdd1eae53d6a79a5462"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-84b1cac9bbc83abd0c1c4bd514c64d4ef14e94bde751c097e633f233a0e132cb1ba9eb383fa7d346d87d639bdf46b80d037c923ffc52cfdd1eae53d6a79a5462"' :
                                            'id="xs-components-links-module-AuthModule-84b1cac9bbc83abd0c1c4bd514c64d4ef14e94bde751c097e633f233a0e132cb1ba9eb383fa7d346d87d639bdf46b80d037c923ffc52cfdd1eae53d6a79a5462"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConnectAccountFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConnectAccountFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SocialComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HttpStatusModule.html" data-type="entity-link" >HttpStatusModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HttpStatusModule-6eddda01910ee30f341c18573fec07487fb2f8e1e75ffa6f0a372418e3f3055c09d46b7a9bfb64c68a0d54d3ec67b10cf08fb3a1aff43ac9b7fbb0823cd546e5"' : 'data-target="#xs-components-links-module-HttpStatusModule-6eddda01910ee30f341c18573fec07487fb2f8e1e75ffa6f0a372418e3f3055c09d46b7a9bfb64c68a0d54d3ec67b10cf08fb3a1aff43ac9b7fbb0823cd546e5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HttpStatusModule-6eddda01910ee30f341c18573fec07487fb2f8e1e75ffa6f0a372418e3f3055c09d46b7a9bfb64c68a0d54d3ec67b10cf08fb3a1aff43ac9b7fbb0823cd546e5"' :
                                            'id="xs-components-links-module-HttpStatusModule-6eddda01910ee30f341c18573fec07487fb2f8e1e75ffa6f0a372418e3f3055c09d46b7a9bfb64c68a0d54d3ec67b10cf08fb3a1aff43ac9b7fbb0823cd546e5"' }>
                                            <li class="link">
                                                <a href="components/HttpStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HttpStatusComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HttpStatusRoutingModule.html" data-type="entity-link" >HttpStatusRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' : 'data-target="#xs-components-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' :
                                            'id="xs-components-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' }>
                                            <li class="link">
                                                <a href="components/ModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskListEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskListEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TasksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' : 'data-target="#xs-directives-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' :
                                        'id="xs-directives-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' }>
                                        <li class="link">
                                            <a href="directives/ModalDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' : 'data-target="#xs-injectables-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' :
                                        'id="xs-injectables-links-module-TasksModule-b766b713ae0781a70ba5231a72de873fe0ff03161e06348e1ca30c8c729f8cc615f8539a0cac816c702ea3442d49a5c96e14c85caffee786c0da0149307ff1e2"' }>
                                        <li class="link">
                                            <a href="injectables/ModalService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksRoutingModule.html" data-type="entity-link" >TasksRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-827e3f24ae1824ccf3f485418373bf559a86935bf35827a6eb8c2cc74394db4c1cd3118a4351dbf4b12d7fd00f35d13f208c521b9304507bdc281eaf203db7a2"' : 'data-target="#xs-components-links-module-UsersModule-827e3f24ae1824ccf3f485418373bf559a86935bf35827a6eb8c2cc74394db4c1cd3118a4351dbf4b12d7fd00f35d13f208c521b9304507bdc281eaf203db7a2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-827e3f24ae1824ccf3f485418373bf559a86935bf35827a6eb8c2cc74394db4c1cd3118a4351dbf4b12d7fd00f35d13f208c521b9304507bdc281eaf203db7a2"' :
                                            'id="xs-components-links-module-UsersModule-827e3f24ae1824ccf3f485418373bf559a86935bf35827a6eb8c2cc74394db4c1cd3118a4351dbf4b12d7fd00f35d13f208c521b9304507bdc281eaf203db7a2"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link" >UsersRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/TaskEditorComponent.html" data-type="entity-link" >TaskEditorComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FakeTasksService.html" data-type="entity-link" >FakeTasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpStatusService.html" data-type="entity-link" >HttpStatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Logger.html" data-type="entity-link" >Logger</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NoAuthGuard.html" data-type="entity-link" >NoAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthResponse.html" data-type="entity-link" >AuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogInDto.html" data-type="entity-link" >LogInDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SocialService.html" data-type="entity-link" >SocialService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskList.html" data-type="entity-link" >TaskList</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});