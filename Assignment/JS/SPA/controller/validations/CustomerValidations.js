// validation for customers
const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z ]{3,}$/;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

//add validations and text fields to the
let c_vArray = new Array();
c_vArray.push({field: $("#txtCustomerID"), regEx: CUS_ID_REGEX});
c_vArray.push({field: $("#txtCustomerName"), regEx: CUS_NAME_REGEX});
c_vArray.push({field: $("#txtCustomerAddress"), regEx: CUS_ADDRESS_REGEX});
c_vArray.push({field: $("#txtCustomerSalary"), regEx: CUS_SALARY_REGEX});

function clearCustomerInputFields() {
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").val("");
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").css("border", "1px solid #ced4da");
    $("#txtCustomerID").focus();
    setBtnCus();
}

setBtnCus();

//disable tab
$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidationsCust(c_vArray[indexNo]);

    setBtnCus();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != c_vArray[c_vArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidationsCust(c_vArray[indexNo])) {
                c_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidationsCust(c_vArray[indexNo])) {
                saveCustomer();
            }
        }
    }
});


function checkValidationsCust(object) {
    if (object.regEx.test(object.field.val())) {
        setBorderCust(true, object)
        return true;
    }
    setBorderCust(false, object)
    return false;
}

function setBorderCust(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAllCust() {
    for (let i = 0; i < c_vArray.length; i++) {
        if (!checkValidationsCust(c_vArray[i])) return false;
    }
    return true;
}

function setBtnCus() {
    $("#btnCusDelete").prop("disabled", true);
    $("#btnUpdate").prop("disabled", true);

    if (checkAllCust()) {
        $("#btnCustomer").prop("disabled", false);
    } else {
        $("#btnCustomer").prop("disabled", true);
    }

    let id = $("#txtCustomerID").val();
    if (searchCustomer(id) == undefined) {
        $("#btnCusDelete").prop("disabled", true);
        $("#btnUpdate").prop("disabled", true);
    } else {
        $("#btnCusDelete").prop("disabled", false);
        $("#btnUpdate").prop("disabled", false);
    }

}

