package models;

import java.util.ArrayList;
import java.util.List;

public class Question {
    private String title;
    private String body;
    private List<Reply> replies;

    public Question(String title, String body) {
        this.title = title;
        this.body = body;
        this.replies = new ArrayList<>();
    }

    public void addReply(Reply reply) {
        replies.add(reply);
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public List<Reply> getReplies() {
        return replies;
    }
}
