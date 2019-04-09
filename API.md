# RESTful API Document

## User Manager

### Login

**POST** /api/user/login

#### Request

* **code** string

#### Response

* Success

    HTTP 200

    ```json
    {
        "code": 200,
        "message": "OK",
        "data": null
    }
    ```

* Error

    HTTP 422
    
    ```json
    {
        "code": 422,
        "message": "Error",
        "error": "Some Error"
    }
    ```
    
### Update User Profile

**PATCH** /api/user/update

#### Request

* **userType** int
* **realName** string
* **studentNumber** *if userType == student* string
* **teacherNumber** *if userType == teacher* string
* **nickName** string
* **sex** string
* **birthDay** string

#### Response

* Success

    HTTP 200

    ```json
    {
        "code": 200,
        "message": "OK",
        "data": "nickname"
    }
    ```

* Error

    HTTP 422
    
    ```json
    {
        "code": 422,
        "message": "Error",
        "error": "Some Error"
    }
    ```

### Switch User Type

**PATCH** /api/user/switch

#### Request

* **code** string

#### Response

* Success

    HTTP 200

    ```json
    {
        "code": 200,
        "message": "OK",
        "data": null
    }
    ```

* Error

    HTTP 422
    
    ```json
    {
        "code": 422,
        "message": "Error",
        "error": "Some Error"
    }
    ```
    