import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "@templates/Home";
import { PassRecovery } from '@templates/PassRecovery';
import { CreateAccount } from '@templates/CreateAccount';
import { MyAccount } from "@templates/MyAccount";
import { MyOrderDetail } from "@templates/MyOrderDetail";
import { MyOrders } from "@templates/MyOrders";
import { SuccessEmail } from "@templates/SuccessEmail";
import { NotFound } from "@templates/NotFound";
import { ProtectedRoute } from "@components/ProtectedRoute";
import { LoginProtectedRoute } from "@components/LoginProtectedRoute";

import AppContext from "@context/AppContext";
import { SyncInfoProvider } from "@context/SyncContext";
import { useInitialState } from "@hooks/useInitialState";
import { useAuth } from "@hooks/useAuth";

/* import '@styles/global.scss';
import '@styles/icon-styles.scss'; */


const App = () => {
    const initialState = useInitialState();
    const {
        currentUser,
        setCurrentUser,
        validateUser,
        addNewUser,
        editCurrentUserInfo,
        syncAuth,
        synchronizeCurrentUser
    } = useAuth();

    return (
        <AppContext.Provider value={initialState}>
            <SyncInfoProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/"
                            element={
                                <ProtectedRoute currentUser={currentUser}>
                                    <Home currentUser={currentUser} setCurrentUser={setCurrentUser} synchronizeCurrentUser={synchronizeCurrentUser} />
                                </ProtectedRoute>
                            }
                        />
                        <Route exact path="/login"
                            element={
                                <LoginProtectedRoute currentUser={currentUser}>
                                    <Login validateUser={validateUser} setCurrentUser={setCurrentUser} />
                                </LoginProtectedRoute>
                            }
                        />
                        <Route exact path="/password-recovery" element={<PassRecovery />} />
                        <Route exact path="/create-account"
                            element={<CreateAccount validateUser={validateUser} addNewUser={addNewUser} />}
                        />
                        <Route exact path="/my-account"
                            element={
                                <ProtectedRoute currentUser={currentUser}>
                                    <MyAccount
                                        currentUser={currentUser}
                                        editCurrentUserInfo={editCurrentUserInfo}
                                        validateUser={validateUser}
                                        syncAuth={syncAuth}
                                        synchronizeCurrentUser={synchronizeCurrentUser}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route exact path="/my-orders"
                            element={
                                <ProtectedRoute currentUser={currentUser}>
                                    <MyOrders synchronizeCurrentUser={synchronizeCurrentUser} />
                                </ProtectedRoute>
                            }
                        />
                        <Route exact path="/my-order/:id"
                            element={
                                <ProtectedRoute currentUser={currentUser}>
                                    <MyOrderDetail />
                                </ProtectedRoute>
                            }
                        />
                        <Route exact path="/success-email" element={<SuccessEmail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </SyncInfoProvider>
        </AppContext.Provider>
    );
}

export { App };
