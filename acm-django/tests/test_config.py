__author__ = 'Derek Argueta'

from django.test import TestCase

class SanityTest(TestCase):

    def test_py_version(self):

        # python 3
        import sys
        self.assertEqual(sys.version_info[0], 3)

    def test_imports(self):

        # imports
        try:
            import fabric
            import mailsnake
            self.assertTrue(True)
        except ImportError:
            self.assertTrue(False)
