export const useLocalStorage = () => {
    const getData = (collection) => {
        let status;
        const data = JSON.parse(localStorage.getItem(collection));
        data ? status = true : status = false;
        return {
            data,
            status
        }
    }
    const sendData = (payload, collection) => {
        let isError = true;
        let status = "Nothing ";
        let massage
        if (typeof payload !== 'object') {
            throw new Error('Payload must be an object');
        }
        const data = JSON.parse(localStorage.getItem(collection));

        if (data) {
            localStorage.setItem(collection, JSON.stringify([...data, payload]));
            status = "Success";
            massage = 'Data add successfully';
        } else {
            localStorage.setItem(collection, JSON.stringify(payload));
            status = "Success";
            massage = 'Data saved successfully';
        }

        if (isError) { 
            massage = 'have wrong error '
        }

        return {
            status,
            isError,
            massage
        }
    }

    const updateData = (payload, collection) => {
        let isError = true;
        let status = "Nothing ";
        let massage;
        const data = JSON.parse(localStorage.getDataItem(collection));
        if (!data) {
            isError = true;
            massage = 'Data not found';
            status ="Success"
        } else {
            localStorage.setItem(collection, JSON.stringify([...data, payload]));
            isError = false;
            massage = 'Data updated successfully';
                        status = "Success"

        }
        if (isError) {
            massage = 'have wrong error '
        }
        return {
            isError,
            massage,
            status
        }
    }

    const deleteData = () => {
        localStorage.clear(collection);
        return {
            status: "Success",
            massage: 'Data deleted successfully'
        }
    }

    return {getData, sendData, deleteData, updateData}
}