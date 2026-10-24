import http.server
import socketserver
import mimetypes

mimetypes.add_type('audio/mpeg', '.mpeg')
mimetypes.add_type('audio/mpeg', '.mp3')

class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

CustomHandler.extensions_map.update({
    '.mpeg': 'audio/mpeg',
    '.mp3': 'audio/mpeg',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
})

PORT = 3000

if __name__ == '__main__':
    with ThreadingHTTPServer(("", PORT), CustomHandler) as httpd:
        print(f"Serving multithreaded at http://localhost:{PORT}")
        httpd.serve_forever()
