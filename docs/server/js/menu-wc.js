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
                    <a href="index.html" data-type="index-link">server documentation</a>
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
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-910b88acb37d91783973633186903f1d6d8f50b59b61dfdab18bcae4ad91dbbb056baaf37d3040fe76623bb0dae7f78551bd3196282c50b4881731af9eaa4ac0"' : 'data-target="#xs-controllers-links-module-AuthModule-910b88acb37d91783973633186903f1d6d8f50b59b61dfdab18bcae4ad91dbbb056baaf37d3040fe76623bb0dae7f78551bd3196282c50b4881731af9eaa4ac0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-910b88acb37d91783973633186903f1d6d8f50b59b61dfdab18bcae4ad91dbbb056baaf37d3040fe76623bb0dae7f78551bd3196282c50b4881731af9eaa4ac0"' :
                                            'id="xs-controllers-links-module-AuthModule-910b88acb37d91783973633186903f1d6d8f50b59b61dfdab18bcae4ad91dbbb056baaf37d3040fe76623bb0dae7f78551bd3196282c50b4881731af9eaa4ac0"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-910b88acb37d91783973633186903f1d6d8f50b59b61dfdab18bcae4ad91dbbb056baaf37d3040fe76623bb0dae7f78551bd3196282c50b4881731af9eaa4ac0"' : 'data-target="#xs-injectables-links-module-AuthModule-910b88acb37d91783973633186903f1d6d8f50b59b61dfdab18bcae4ad91dbbb056baaf37d3040fe76623bb0dae7f78551bd3196282c50b4881731af9eaa4ac0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-910b88acb37d91783973633186903f1d6d8f50b59b61dfdab18bcae4ad91dbbb056baaf37d3040fe76623bb0dae7f78551bd3196282c50b4881731af9eaa4ac0"' :
                                        'id="xs-injectables-links-module-AuthModule-910b88acb37d91783973633186903f1d6d8f50b59b61dfdab18bcae4ad91dbbb056baaf37d3040fe76623bb0dae7f78551bd3196282c50b4881731af9eaa4ac0"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VkontakteStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VkontakteStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TasksModule-df42870261f185efe8d6b37e542dcc58609a0fb558950047e0bb2de4bd41150d997f3d309f81330d8a1ea61b992e2dc3d13dcb59a2ccc2b2c76a025bb23a034f"' : 'data-target="#xs-controllers-links-module-TasksModule-df42870261f185efe8d6b37e542dcc58609a0fb558950047e0bb2de4bd41150d997f3d309f81330d8a1ea61b992e2dc3d13dcb59a2ccc2b2c76a025bb23a034f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TasksModule-df42870261f185efe8d6b37e542dcc58609a0fb558950047e0bb2de4bd41150d997f3d309f81330d8a1ea61b992e2dc3d13dcb59a2ccc2b2c76a025bb23a034f"' :
                                            'id="xs-controllers-links-module-TasksModule-df42870261f185efe8d6b37e542dcc58609a0fb558950047e0bb2de4bd41150d997f3d309f81330d8a1ea61b992e2dc3d13dcb59a2ccc2b2c76a025bb23a034f"' }>
                                            <li class="link">
                                                <a href="controllers/TasksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TasksModule-df42870261f185efe8d6b37e542dcc58609a0fb558950047e0bb2de4bd41150d997f3d309f81330d8a1ea61b992e2dc3d13dcb59a2ccc2b2c76a025bb23a034f"' : 'data-target="#xs-injectables-links-module-TasksModule-df42870261f185efe8d6b37e542dcc58609a0fb558950047e0bb2de4bd41150d997f3d309f81330d8a1ea61b992e2dc3d13dcb59a2ccc2b2c76a025bb23a034f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-df42870261f185efe8d6b37e542dcc58609a0fb558950047e0bb2de4bd41150d997f3d309f81330d8a1ea61b992e2dc3d13dcb59a2ccc2b2c76a025bb23a034f"' :
                                        'id="xs-injectables-links-module-TasksModule-df42870261f185efe8d6b37e542dcc58609a0fb558950047e0bb2de4bd41150d997f3d309f81330d8a1ea61b992e2dc3d13dcb59a2ccc2b2c76a025bb23a034f"' }>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-670b8ebe899e8bdfbdb38d85c93f9f7f2ac596d2e2e990242ce1092e70b0dab0869bb0ea55c9f1927b7f559ce1a98934e8a88b82177c7ecb414ff8ac4aaad7d7"' : 'data-target="#xs-controllers-links-module-UsersModule-670b8ebe899e8bdfbdb38d85c93f9f7f2ac596d2e2e990242ce1092e70b0dab0869bb0ea55c9f1927b7f559ce1a98934e8a88b82177c7ecb414ff8ac4aaad7d7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-670b8ebe899e8bdfbdb38d85c93f9f7f2ac596d2e2e990242ce1092e70b0dab0869bb0ea55c9f1927b7f559ce1a98934e8a88b82177c7ecb414ff8ac4aaad7d7"' :
                                            'id="xs-controllers-links-module-UsersModule-670b8ebe899e8bdfbdb38d85c93f9f7f2ac596d2e2e990242ce1092e70b0dab0869bb0ea55c9f1927b7f559ce1a98934e8a88b82177c7ecb414ff8ac4aaad7d7"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-670b8ebe899e8bdfbdb38d85c93f9f7f2ac596d2e2e990242ce1092e70b0dab0869bb0ea55c9f1927b7f559ce1a98934e8a88b82177c7ecb414ff8ac4aaad7d7"' : 'data-target="#xs-injectables-links-module-UsersModule-670b8ebe899e8bdfbdb38d85c93f9f7f2ac596d2e2e990242ce1092e70b0dab0869bb0ea55c9f1927b7f559ce1a98934e8a88b82177c7ecb414ff8ac4aaad7d7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-670b8ebe899e8bdfbdb38d85c93f9f7f2ac596d2e2e990242ce1092e70b0dab0869bb0ea55c9f1927b7f559ce1a98934e8a88b82177c7ecb414ff8ac4aaad7d7"' :
                                        'id="xs-injectables-links-module-UsersModule-670b8ebe899e8bdfbdb38d85c93f9f7f2ac596d2e2e990242ce1092e70b0dab0869bb0ea55c9f1927b7f559ce1a98934e8a88b82177c7ecb414ff8ac4aaad7d7"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/AngularUniversalFilter.html" data-type="entity-link" >AngularUniversalFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppValidationPipe.html" data-type="entity-link" >AppValidationPipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConnectAccountDto.html" data-type="entity-link" >ConnectAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAccountDto.html" data-type="entity-link" >CreateAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTaskDto.html" data-type="entity-link" >CreateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTaskListDto.html" data-type="entity-link" >CreateTaskListDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogInDto.html" data-type="entity-link" >LogInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostgresqlContainerDatabase.html" data-type="entity-link" >PostgresqlContainerDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SqliteInMemoryDatabase.html" data-type="entity-link" >SqliteInMemoryDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskList.html" data-type="entity-link" >TaskList</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAccountDto.html" data-type="entity-link" >UpdateAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskDto.html" data-type="entity-link" >UpdateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskListDto.html" data-type="entity-link" >UpdateTaskListDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
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
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link" >GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OptionalJwtAuthGuard.html" data-type="entity-link" >OptionalJwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VkontakteAuthGuard.html" data-type="entity-link" >VkontakteAuthGuard</a>
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
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthorizationGuard.html" data-type="entity-link" >AuthorizationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NoAuthenticationGuard.html" data-type="entity-link" >NoAuthenticationGuard</a>
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
                                <a href="interfaces/AccountInterface.html" data-type="entity-link" >AccountInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TestDatabase.html" data-type="entity-link" >TestDatabase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link" >UserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPasswordInterface.html" data-type="entity-link" >UserPasswordInterface</a>
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