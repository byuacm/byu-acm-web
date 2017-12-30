
from social_core.backends.open_id_connect import OpenIdConnectAuth


class ByuOpenIdConnectAuth(OpenIdConnectAuth):
    """BYU OpenID authentication backend"""

    def auth_html(self):
        pass

    name = 'byu'
    API_ENDPOINT = 'https://api.byu.edu/'
    OIDC_ENDPOINT = 'https://api.byu.edu/'
    ID_TOKEN_ISSUER = 'https://wso2-is.byu.edu/oauth2endpoints/token'

    def get_user_details(self, response):
        email = response.get('email')
        if not email or email == 'unlisted':
            email = None
        values = {
            'username': self.id_token['net_id'],
            'email': email,
            'first_name': self.id_token['preferred_first_name'],
            'last_name': self.id_token['surname'],
        }

        coursework = self.get_json(
            '{}domains/legacy/academic/records/stdcoursework/'.format(
                self.API_ENDPOINT),
            headers={
                'Authorization': 'Bearer {0}'.format(
                    response['access_token']
                )
            })

        return values

    def validate_claims(self, id_token):
        # TODO: https://developer.byu.edu/docs/design-api/byu-usage-json-web-token
        super().validate_claims(id_token)

    def get_user_id(self, details, response):
        """Return a unique ID for the current user, by default from server
        response."""
        return self.id_token['person_id']

