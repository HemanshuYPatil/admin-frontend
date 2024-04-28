
import { https } from "firebase-functions";
import { initializeApp, auth } from "firebase-admin";

initializeApp();


export const disableUser = https.onCall(async (data, context) => {

    if (!context.auth || !context.auth.token.admin) {
        throw new https.HttpsError('permission-denied', 'You do not have permission to perform this action.');
    }


    const { uid } = data;

    try {

        
        await auth().updateUser(uid, {
            disabled: true
        });

 
        return { success: true };
    } catch (error) {

        throw new https.HttpsError('internal', 'Error disabling user account.', error);
    }
});
