use auth0::Auth0Client;
use rocket::http::Status;
use rocket::request::{self, FromRequest, Request};
use rocket::Outcome;

struct AuthenticatedUser {
    user_id: String,
    email: String,
}

impl<'a, 'r> FromRequest<'a, 'r> for AuthenticatedUser {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
        let access_token = match request.headers().get_one("Authorization") {
            Some(token) => {
                let token = token.trim_start_matches("Bearer ");
                token.to_string()
            }
            None => return Outcome::Failure((Status::Unauthorized, ())),
        };

        let client = Auth0Client::new("dev-2ere3xom3pqjdylj.us.auth0.com", "jVB18Gzldk9aNyJbfBIxgP2X3CExFEIy");

        match client.decode_token::<Auth0Claims>(&access_token) {
            Ok(claims) => {
                let user_id = claims.sub;
                let email = claims.email;
                let authenticated_user = AuthenticatedUser { user_id, email };
                Outcome::Success(authenticated_user)
            }
            Err(_) => Outcome::Failure((Status::Unauthorized, ())),
        }
    }
}

#[derive(Deserialize)]
struct Auth0Claims {
    sub: String,
    email: String,
}

#[get("/protected")]
fn protected_route(user: AuthenticatedUser) -> String {
    let user_id = user.user_id;
    let email = user.email;
    format!("Authenticated User: ID={}, Email={}", user_id, email)
}

fn main() {
    rocket::ignite().mount("/", routes![protected_route]).launch();
}
