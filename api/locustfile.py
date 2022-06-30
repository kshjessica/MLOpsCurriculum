from locust import HttpUser, TaskSet, task, between


class UserBehavior(TaskSet):
    @task
    def get_all_users(self):
        with self.client.get("/user", catch_response=True) as response:
            if response.status_code == 200:
                response.success("Succeeded to get all users")
            else:
                response.failure("Failed to get all users")

    @task
    def create_user(self):
        with self.client.post(
            "/user", {"name": "testuser", "age": 20}, catch_response=True
        ) as response:
            if response.status_code == 201:
                response.success("Succeeded to create user")
            else:
                response.failure("Failed to create user")

    def on_start(self):
        print("START LOCUST")

    def on_stop(self):
        print("STOP LOCUST")


class LocustUser(HttpUser):
    host = "127.0.0.1:8000"
    tasks = [UserBehavior]
    wait_time = between(1, 4)
