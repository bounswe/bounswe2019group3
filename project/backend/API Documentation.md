<a name="top"></a>
# bounswe2019group3-backend v1.0.0

backend project

- [annotation](#annotation)
	- [create new annotation](#create-new-annotation)
	- [deletes the annotation specified by the id](#deletes-the-annotation-specified-by-the-id)
	- [returns the annotation specified by the id](#returns-the-annotation-specified-by-the-id)
	- [lists the annotations filtered by creator, target_creator, target_source](#lists-the-annotations-filtered-by-creator,-target_creator,-target_source)
	
- [auth](#auth)
	- [login](#login)
	- [logout](#logout)
	- [signup](#signup)
	
- [chat](#chat)
	- [create new message for username](#create-new-message-for-username)
	- [general chat history](#general-chat-history)
	- [chat history with username](#chat-history-with-username)
	
- [language](#language)
	- [return all exercise of type](#return-all-exercise-of-type)
	- [return the exercise](#return-the-exercise)
	- [return recommendation](#return-recommendation)
	- [evaluate the exercise](#evaluate-the-exercise)
	- [returns available languages](#returns-available-languages)
	- [evaluates level determination exam](#evaluates-level-determination-exam)
	- [returns level determination exam questions](#returns-level-determination-exam-questions)
	
- [search](#search)
	- [search](#search)
	
- [user](#user)
	- [returns exercise progress](#returns-exercise-progress)
	- [returns language progress](#returns-language-progress)
	- [get language radar data](#get-language-radar-data)
	- [create comment for username](#create-comment-for-username)
	- [returns all users](#returns-all-users)
	- [returns user details](#returns-user-details)
	- [update user details](#update-user-details)
	- [returns user comments](#returns-user-comments)
	- [returns user language level details](#returns-user-language-level-details)
	
- [writing](#writing)
	- [save writing](#save-writing)
	- [get writing by id](#get-writing-by-id)
	- [list writing](#list-writing)
	- [set assignee](#set-assignee)
	

# <a name='annotation'></a> annotation

## <a name='create-new-annotation'></a> create new annotation
[Back to top](#top)

<p>This endpoint takes an annotation in the W3C Web Annotation Data Model format (https://www.w3.org/TR/annotation-model/) and saves it to the database</p>

```
POST /api/annotation
```

### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| annotation | `Object` | <p>(see W3C Web Annotation Data Model for details)</p> |
| annotation.type | `String` |  |
| annotation.body | `Object` |  |
| annotation.target | `Object` |  |
| annotation.motivation | `Object` |  |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` |  |
## <a name='deletes-the-annotation-specified-by-the-id'></a> deletes the annotation specified by the id
[Back to top](#top)

<p>This endpoint deletes the annotation specified by the id</p>

```
DELETE /api/annotation/:id
```

### Request Param Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` |  |


## <a name='returns-the-annotation-specified-by-the-id'></a> returns the annotation specified by the id
[Back to top](#top)

<p>This endpoint returns the annotation specified by the id in the W3C Web Annotation Data Model format (https://www.w3.org/TR/annotation-model/)</p>

```
GET /api/annotation/:id
```

### Request Param Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` |  |


### body(JSON)
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| annotation | `Object` | <p>(see W3C Web Annotation Data Model for details)</p> |
| annotation.type | `String` |  |
| annotation.body | `Object` |  |
| annotation.target | `Object` |  |
| annotation.creator | `Object` |  |
| annotation.motivation | `Object` |  |
## <a name='lists-the-annotations-filtered-by-creator,-target_creator,-target_source'></a> lists the annotations filtered by creator, target_creator, target_source
[Back to top](#top)

<p>This endpoint returns a list of annotations in the W3C Web Annotation Data Model format (https://www.w3.org/TR/annotation-model/) filtered by creator, target_creator, target_source</p>

```
GET /api/annotation
```

### Request Query Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| creator | `String` |  |
| target_creator | `String` |  |
| target_source | `String` |  |


### body(JSON)
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| annotation | `Object[]` | <p>(see W3C Web Annotation Data Model for details)</p> |
| annotation.type | `String` |  |
| annotation.body | `Object` |  |
| annotation.target | `Object` |  |
| annotation.creator | `Object` |  |
| annotation.motivation | `Object` |  |
# <a name='auth'></a> auth

## <a name='login'></a> login
[Back to top](#top)



```
POST /api/auth/login
```

### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | <p>username or email of the user.</p> |
| password | `String` | <p>password of the user.</p> |


## <a name='logout'></a> logout
[Back to top](#top)



```
POST /api/auth/logout
```



## <a name='signup'></a> signup
[Back to top](#top)



```
POST /api/auth/signup
```

### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| username | `String` |  |
| email | `String` |  |
| password | `String` |  |


# <a name='chat'></a> chat

## <a name='create-new-message-for-username'></a> create new message for username
[Back to top](#top)



```
POST /api/chat/:username
```

### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| body | `Object` |  |
| body.message | `String` | <p>message text</p> |

### Success Response
Success-Response:

```
HTTP/1.1 204 OK
```

## <a name='general-chat-history'></a> general chat history
[Back to top](#top)



```
GET /api/chat/
```


### Success Response
Success-Response:

```
HTTP/1.1 200 OK
{
  "nb_new_messages": 3,
  "history": [
     {
         "username": "user",
         "last_message": "hello world",
         "nb_new_messages": 1,
         "last_message_date": "2013-10-21T13:28:06.419Z"
     },
     {
         "username": "admin",
         "last_message": "welcome to bulingo",
         "nb_new_messages": 2,
         "last_message_date": "2013-10-20T11:10:04.222Z"
     }
  ]
}
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| chat | `Object` | <p>chat</p> |
| chat.nb_new_messages | `Integer` | <p>number of new messages (all)</p> |
| chat.history | `Object[]` | <p>chat history with all users (ordered by date)</p> |
| chat.history.username | `String` | <p>username</p> |
| chat.history.last_message | `String` | <p>last message</p> |
| chat.history.nb_new_messages | `Integer` | <p>number of new messages from that user</p> |
| chat.history.last_message_date | `String` | <p>date of the last message</p> |
## <a name='chat-history-with-username'></a> chat history with username
[Back to top](#top)



```
GET /api/chat/:username
```

### URL Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| username | `String` | <p>opponent user's username</p> |
| skip | `String` | <p>number of messages to skip</p> |
| limit | `String` | <p>number of messages to return</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| messages | `Object[]` | <p>list of messages</p> |
| messages.to_username | `String` | <p>message receiver</p> |
| messages.from_username | `String` | <p>message sender</p> |
| messages.message | `String` | <p>message text</p> |
| messages.new | `Boolean` | <p>message is read boolean</p> |
# <a name='language'></a> language

## <a name='return-all-exercise-of-type'></a> return all exercise of type
[Back to top](#top)



```
GET /api/language/:language_abbr/exercise
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| exercise | `Object[]` | <p>exercises</p> |
| exercise.exersice_id | `Integer` | <p>exercise id</p> |
| exercise.title | `String` | <p>exercise title</p> |
| exercise.language_abbr | `String` | <p>exercise language abbreviation</p> |
| exercise.exercise_type | `Stirng` | <p>exercise exercise type</p> |
| exercise.level | `String` | <p>exercise level</p> |
| exercise.tags | `String` | <p>exercise tags</p> |
## <a name='return-the-exercise'></a> return the exercise
[Back to top](#top)



```
GET /api/language/:language_abbr/exercise/:exersice_id/questions
```



### Request body(JSON)
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| question_id | `String` | <p>question id</p> |
| desc | `String` | <p>question description</p> |
| media_url | `String` | <p>media url related to question (optional)</p> |
| media_type | `String` | <p>media type related to question (optional)</p> |
| media_start_time | `String` | <p>media start time related to question (optional)</p> |
| media_end_time | `String` | <p>media end time related to question (optional)</p> |
| choices | `Object[]` | <p>answer choices (optional: not available for writing)</p> |
| choices.id | `String` | <p>choice id</p> |
| choices.desc | `String` | <p>choice description</p> |
## <a name='return-recommendation'></a> return recommendation
[Back to top](#top)



```
GET /api/language/:language_abbr/recommendation/:id
```



### Request body(JSON)
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| recommendation | `Object[]` |  |
| recommendation.username | `String` | <p>username</p> |
| recommendation.rating | `String` | <p>rating</p> |
| recommendation.grade | `String` | <p>grade</p> |
## <a name='evaluate-the-exercise'></a> evaluate the exercise
[Back to top](#top)



```
POST /api/language/:language_abbr/exercise/:exersice_id/evaluate
```

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| answers | `Object[]` |  |
| answers.question_id | `Integer` | <p>answer question id</p> |
| answers.choice_id | `Integer` | <p>answer choice id</p> |
| answers.text | `String` | <p>(optional: only available for writing)</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| nb_correct_answers | `Integer` | <p>number of correct answers</p> |
| nb_questions | `Integer` | <p>number of questions</p> |
| answers | `Object[]` | <p>media related to question (e.g. listening material) (optional)</p> |
| answers.question_id | `Integer` | <p>question id</p> |
| answers.choice_id | `Integer` | <p>correct choices id</p> |
## <a name='returns-available-languages'></a> returns available languages
[Back to top](#top)



```
GET /api/language/
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| language | `Object[]` | <p>list of languages</p> |
| language.name | `String` | <p>language name</p> |
| language.abbr | `String` | <p>language abbreviation</p> |
## <a name='evaluates-level-determination-exam'></a> evaluates level determination exam
[Back to top](#top)



```
POST /api/language/:language_abbr/exam/evaluate
```

### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| answers | `Object[]` | <p>list of answers</p> |
| answers.question_id | `Integer` | <p>question id</p> |
| answers.choices_id | `Integer` | <p>choices id</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| grade | `String` | <p>result of evaluation</p> |
## <a name='returns-level-determination-exam-questions'></a> returns level determination exam questions
[Back to top](#top)



```
GET /api/language/:language_abbr/exam/questions
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| questions | `Object[]` | <p>list of exam questions</p> |
| questions.id | `Integer` | <p>question id</p> |
| questions.desc | `String` | <p>question description</p> |
| questions.choices | `Object[]` | <p>answer choices</p> |
| questions.choices.id | `Integer` | <p>answer choices id</p> |
| questions.choices.desc | `String` | <p>answer choices description</p> |
# <a name='search'></a> search

## <a name='search'></a> search
[Back to top](#top)



```
GET /api/search/
```

### URL Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| text | `String` | <p>text to be searched</p> |
| type | `String` | <p>what type of data to be searched (exercise/user)</p> |
| lang_abbr | `String` | <p>lang_abbr (exercise)</p> |
| level | `String` | <p>level (exercise)</p> |
| exercise_type | `String` | <p>exercise_type (exercise)</p> |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| result | `Object[]` | <p>result array</p> |
| result.type | `String` | <p>type of data</p> |
| result.username | `String` | <p>username of the user (optional: only for user type)</p> |
| result.exersice_id | `Integer` | <p>id of the exercise (optional: only for exercise)</p> |
| result.title | `String` | <p>title of the exercise (optional: only for exercise)</p> |
| result.lang_abbr | `String` | <p>language of the exercise (optional: only for exercise)</p> |
| result.exercises_type | `String` | <p>type of the exercise (optional: only for exercise)</p> |
| result.level | `Integer` | <p>level of the exercise (optional: only for exercise)</p> |
| result.tags | `String` | <p>tags of the exercise (optional: only for exercise)</p> |
# <a name='user'></a> user

## <a name='returns-exercise-progress'></a> returns exercise progress
[Back to top](#top)



```
GET /api/user/:username/exercise/:exercise_id/progress
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| username | `String` | <p>username of user</p> |
| exercise_id | `Integer` | <p>exercise id</p> |
| question_done | `Integer` | <p>number of questions answered correctly</p> |
| questions | `Integer` | <p>number of all questions</p> |
| updatedAt | `String` | <p>last created or updated time</p> |
## <a name='returns-language-progress'></a> returns language progress
[Back to top](#top)



```
GET /api/user/:username/language/:language_abbr/progress
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| username | `String` | <p>username of user</p> |
| lang_abbr | `String` | <p>language abbreviation</p> |
| exercise_done | `Integer` | <p>number of completed exercises</p> |
| exercises | `Integer` | <p>number of all exercises</p> |
| updatedAt | `String` | <p>last created or updated time</p> |
## <a name='get-language-radar-data'></a> get language radar data
[Back to top](#top)



```
GET /:username/language/:language_abbr/radar
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| radar | `Object` |  |
| radar.listening | `Integer` | <p>listening point (over 100)</p> |
| radar.reading | `Integer` | <p>reading point (over 100)</p> |
| radar.grammer | `Integer` | <p>grammer point (over 100)</p> |
| radar.vocabulary | `Integer` | <p>vocabulary point (over 100)</p> |
| radar.writing | `Integer` | <p>writing point (over 100)</p> |
## <a name='create-comment-for-username'></a> create comment for username
[Back to top](#top)



```
POST /api/user/:username/comments/
```

### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| comment | `Object` |  |
| comment.text | `String` | <p>text</p> |
| comment.rating | `Integer` | <p>rating (1,2,3,4,5)</p> |

### Success Response
Success-Response:

```
HTTP/1.1 204 OK
```

## <a name='returns-all-users'></a> returns all users
[Back to top](#top)



```
GET /api/user/
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>user object</p> |
| user.username | `String` | <p>username</p> |
## <a name='returns-user-details'></a> returns user details
[Back to top](#top)



```
GET /api/user/:username
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>user object</p> |
| user.username | `String` | <p>username</p> |
| user.email | `String` | <p>email</p> |
| user.bio | `String` | <p>biography text</p> |
| user.avatar | `String` | <p>avatar url</p> |
| user.rating | `Float` | <p>rating from comments</p> |
## <a name='update-user-details'></a> update user details
[Back to top](#top)



```
POST /api/user/:username
```

### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| user | `Object` | <p>user object</p> |
| user.bio | `String` | <p>biography text</p> |
| user.avatar | `File` | <p>avatar image file</p> |


## <a name='returns-user-comments'></a> returns user comments
[Back to top](#top)



```
GET /api/user/:username/comments
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| comments | `Object[]` | <p>comments</p> |
| comments.text | `String` | <p>comment text</p> |
| comments.rating | `String` | <p>comment rating</p> |
| comments.comment_by | `String` | <p>author of comment</p> |
| comments.comment_to | `String` | <p>target of comment</p> |
| comments.createdAt | `String` | <p>creation time of comment</p> |
## <a name='returns-user-language-level-details'></a> returns user language level details
[Back to top](#top)



```
GET /api/user/:username/language/level
```



### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| language_levels | `Object[]` | <p>language levels</p> |
| language_levels.lang_abbr | `String` | <p>language abbr</p> |
| language_levels.grade | `String` | <p>language level</p> |
# <a name='writing'></a> writing

## <a name='save-writing'></a> save writing
[Back to top](#top)



```
POST /api/writing/
```

### Request body Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| writing | `Object` |  |
| writing.text | `String` |  |
| writing.image | `File` |  |
| writing.lang_abbr | `String` |  |
| writing.title | `String` | <p>(optional)</p> |
| writing.assignee | `String` | <p>assignee username (optional)</p> |

### Success Response
Success-Response:

```
HTTP/1.1 204 OK
```

## <a name='get-writing-by-id'></a> get writing by id
[Back to top](#top)



```
GET /api/writing/:id
```


### Success Response
Success-Response:

```
HTTP/1.1 200 OK
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| writing | `Object` | <p>writing</p> |
| writing.writing_id | `Integer` | <p>writing id</p> |
| writing.title | `String` | <p>title</p> |
| writing.text | `String` | <p>text</p> |
| writing.image | `String` | <p>image</p> |
| writing.lang_abbr | `String` | <p>lang_abbr</p> |
| writing.written_by | `String` | <p>author of writing</p> |
| writing.assignee | `String` | <p>assignee</p> |
## <a name='list-writing'></a> list writing
[Back to top](#top)



```
GET /api/writing/
```


### Success Response
Success-Response:

```
HTTP/1.1 200 OK
```

### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| writings | `Object[]` | <p>writings</p> |
| writings.writing_id | `Integer` | <p>writing id</p> |
| writings.title | `String` | <p>title</p> |
| writings.text | `String` | <p>text</p> |
| writings.image | `String` | <p>image</p> |
| writings.lang_abbr | `String` | <p>lang_abbr</p> |
| writings.written_by | `String` | <p>author of writing</p> |
| writings.assignee | `String` | <p>assignee</p> |
## <a name='set-assignee'></a> set assignee
[Back to top](#top)



```
PUT /api/writing/:id/assignee/:assignee_username
```


### Success Response
Success-Response:

```
HTTP/1.1 204 OK
```

