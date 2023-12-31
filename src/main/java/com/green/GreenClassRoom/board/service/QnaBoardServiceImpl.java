package com.green.GreenClassRoom.board.service;

import com.green.GreenClassRoom.board.vo.QnaBookMarkVO;
import com.green.GreenClassRoom.board.vo.QnaBoardVO;
import com.green.GreenClassRoom.board.vo.QnaReplyVO;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnaBoardServiceImpl implements QnaBoardService{
    private final SqlSessionTemplate sqlSession;

    @Override
    public void insert(QnaBoardVO qnaBoardVO) {
        sqlSession.insert("qnaBoardMapper.insert", qnaBoardVO);
    }

    @Override
    public List<QnaBoardVO> selectQnaBoard(QnaBoardVO qnaBoardVO) {
        return sqlSession.selectList("qnaBoardMapper.selectQnaBoard", qnaBoardVO);
    }

    @Override
    public int updateCnt(int qnaBoardNum) {
        return sqlSession.update("qnaBoardMapper.updateCnt", qnaBoardNum);
    }

    @Override
    public QnaBoardVO qnaBoardDetail(int qnaBoardNum) {
        return sqlSession.selectOne("qnaBoardMapper.qnaBoardDetail", qnaBoardNum);
    }

    @Override
    public int deleteQnaBoard(int qnaBoardNum) {
        return sqlSession.delete("qnaBoardMapper.deleteQnaBoard", qnaBoardNum);
    }

    @Override
    public int updateQnaBoard(QnaBoardVO qnaBoardVO) {
        return sqlSession.update("qnaBoardMapper.updateQnaBoard", qnaBoardVO);
    }

    @Override
    public int deleteFile(QnaBoardVO qnaBoardVO) {
        return sqlSession.update("qnaBoardMapper.deleteFile", qnaBoardVO);
    }

    @Override
    public int updateFile(QnaBoardVO qnaBoardVO) {
        return sqlSession.update("qnaBoardMapper.updateFile", qnaBoardVO);
    }

    @Override
    public int insertFile(QnaBoardVO qnaBoardVO) {
        return sqlSession.insert("qnaBoardMapper.insertFile", qnaBoardVO);
    }

    @Override
    public int selectQnaBoardCnt() {
        return sqlSession.selectOne("qnaBoardMapper.selectQnaBoardCnt");
    }

    @Override
    public int insertQnaReply(QnaReplyVO qnaReplyVO) {
        return sqlSession.insert("qnaBoardMapper.insertQnaReply", qnaReplyVO);
    }

    @Override
    public List<QnaReplyVO> selectQnaReply(QnaReplyVO qnaReplyVO) {
        return sqlSession.selectList("qnaBoardMapper.selectQnaReply", qnaReplyVO);
    }

    @Override
    public void deleteQnaReply(QnaReplyVO qnaReplyVO) {
        sqlSession.delete("qnaBoardMapper.deleteQnaReply", qnaReplyVO);
    }

    @Override
    public int totalQnaReply(int qnaBoardNum) {
        return sqlSession.selectOne("qnaBoardMapper.totalQnaReply", qnaBoardNum);
    }


    @Override
    public QnaBookMarkVO selectInsertBookMark(QnaBookMarkVO qnaBookMarkVO) {
        return sqlSession.selectOne("qnaBoardMapper.selectInsertBookMark", qnaBookMarkVO);
    }

    @Override
    public int updateQnaReplyCnt(QnaBoardVO qnaBoardVO) {
        return sqlSession.update("qnaBoardMapper.updateQnaReplyCnt", qnaBoardVO);
    }


}
